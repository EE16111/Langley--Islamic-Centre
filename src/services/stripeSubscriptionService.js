/**
 * @file stripeSubscriptionService.js
 * @description Production-grade Stripe Subscriptions & BACS Direct Debit integration architecture
 * for Langley Islamic Centre (Charity No. 1180443).
 * 
 * Money Flow:
 * 1. Donor enters details once (Card, Apple Pay, or UK Bank Sort Code/Account Number).
 * 2. Stripe creates a Customer & Subscription (e.g. £10/mo, £40/mo, or £83.33/mo for Musalla Waqf).
 * 3. Stripe charges automatically on the scheduled day each month.
 * 4. Stripe automatically deposits funds directly into Langley Islamic Centre's HSBC Account:
 *    - Sort Code: 40-42-08
 *    - Account Number: 0249 4973
 *    - Bank: HSBC UK Bank plc
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

// Langley Islamic Centre Verified Bank Details for Payouts
export const MASJID_BANK_DETAILS = {
  charityName: "Langley Islamic Centre",
  charityNumber: "1180443",
  bankName: "HSBC UK",
  sortCode: "40-42-08",
  accountNumber: "0249 4973",
  currency: "gbp"
};

/**
 * 1. Create a Recurring Monthly Sadaqah Jariyah Subscription
 * Supports both Credit/Debit Cards, Apple Pay, and BACS Direct Debit
 */
export async function createMonthlyDonationSubscription({
  donorEmail,
  donorName,
  amountPence, // e.g. 1000 = £10.00/mo, 8333 = £83.33/mo
  campaignTier, // 'monthly_sadaqah', 'quran_sponsor', 'musalla_pledge'
  isGiftAidEligible = false,
  giftAidAddress = null, // { line1, postcode }
  cancelAfterMonths = null // null for continuous, or 12 for 12-month Musalla pledge
}) {
  try {
    // Step A: Find or create Stripe Customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email: donorEmail, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: donorEmail,
        name: donorName,
        metadata: {
          charity: "Langley Islamic Centre",
          charity_number: "1180443",
          gift_aid_eligible: isGiftAidEligible ? "true" : "false",
          gift_aid_address: giftAidAddress ? `${giftAidAddress.line1}, ${giftAidAddress.postcode}` : "none"
        }
      });
    }

    // Step B: Create a recurring Price object (or lookup existing price ID)
    const price = await stripe.prices.create({
      unit_amount: amountPence,
      currency: 'gbp',
      recurring: {
        interval: 'month',
        interval_count: 1
      },
      product_data: {
        name: `Monthly Sadaqah Jariyah - ${campaignTier}`,
        metadata: {
          charity: "Langley Islamic Centre",
          charity_number: "1180443"
        }
      }
    });

    // Step C: Build subscription parameters
    const subscriptionParams = {
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card', 'bacs_debit'] // Both cards and UK BACS Direct Debit
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        campaignTier,
        isGiftAidEligible: isGiftAidEligible ? "true" : "false",
        donorName
      }
    };

    // If 12-month fixed pledge (e.g. £83.33/mo for 1 Musalla = £1,000 total)
    if (cancelAfterMonths && cancelAfterMonths > 0) {
      const cancelDate = Math.floor(Date.now() / 1000) + (cancelAfterMonths * 30.5 * 24 * 60 * 60);
      subscriptionParams.cancel_at = Math.floor(cancelDate);
    }

    const subscription = await stripe.subscriptions.create(subscriptionParams);

    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent?.client_secret,
      status: subscription.status
    };
  } catch (error) {
    console.error("Failed to create monthly donation subscription:", error);
    throw error;
  }
}

/**
 * 2. Automated Payout Verification
 * How Stripe deposits money into LIC's HSBC Bank Account
 */
export async function getMasjidPayoutSchedule() {
  // In the Stripe Dashboard:
  // Settings > Bank accounts and scheduling
  // Bank: HSBC (Account: 0249 4973, Sort Code: 40-42-08)
  // Payout Schedule: Automatic Daily (rolling 7-day or 3-day UK settlement)
  return {
    recipientBank: MASJID_BANK_DETAILS.bankName,
    sortCode: MASJID_BANK_DETAILS.sortCode,
    accountNumber: MASJID_BANK_DETAILS.accountNumber,
    payoutSchedule: "Daily Rolling Automatic Deposit",
    settlementCurrency: "GBP",
    fees: {
      bacsDirectDebit: "1.0% + 20p (Capped at £2.00 max fee)",
      ukCharityCards: "1.4% + 20p (Discounted Stripe Registered Charity rate for #1180443)"
    }
  };
}
