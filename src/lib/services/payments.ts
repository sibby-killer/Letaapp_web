export class PaymentService {
    private static SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

    /**
     * Initialize a Split Payment Transaction.
     * Splits: Vendor (100% of goods), Rider (80% of delivery), Platform (20% of delivery).
     * Note: Real Paystack API requires defining 'subaccounts' beforehand.
     */
    static async initializeSplitTransaction(
        email: string,
        amount: number,
        metadata: any,
        vendorSubaccount: string,
        riderSubaccount: string
    ) {
        if (!this.SECRET_KEY) throw new Error("Missing Paystack Secret Key")

        try {
            // Logic to calculate shares (simplified for demo)
            // In reality, you'd calculate exact amounts based on cart vs delivery fee

            const response = await fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    amount: amount * 100, // Paystack uses kobo/cents
                    currency: 'KES',
                    split: {
                        type: 'percentage',
                        bearer_type: 'account',
                        subaccounts: [
                            { subaccount: vendorSubaccount, share: 80 }, // Example split
                            { subaccount: riderSubaccount, share: 15 }
                        ]
                    },
                    metadata
                })
            })

            const data = await response.json()
            if (!data.status) throw new Error(data.message)

            return data.data // authorization_url, access_code, reference
        } catch (error) {
            console.error("Payment Init Error:", error)
            throw error
        }
    }

    static async verifyTransaction(reference: string) {
        if (!this.SECRET_KEY) throw new Error("Missing Paystack Secret Key")

        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: { Authorization: `Bearer ${this.SECRET_KEY}` }
            })
            const data = await response.json()
            return data.status && data.data.status === 'success'
        } catch (error) {
            console.error("Payment Verify Error:", error)
            return false
        }
    }
}
