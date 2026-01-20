import { supabase } from '@/lib/supabase'

export class ReferralService {
    static async processReferral(referrerId: string, newUserId: string, userType: 'student' | 'rider' | 'vendor') {
        // 1. Validate Referrer
        // 2. Assign Rewards based on User Type

        let rewardAmount = 0
        let rewardType = 'credits'

        switch (userType) {
            case 'student':
                rewardAmount = 50 // KES 50 for referring a student
                break
            case 'rider':
                rewardAmount = 200 // KES 200 for referring a rider
                rewardType = 'cash_bonus'
                break
            case 'vendor':
                rewardAmount = 500 // KES 500
                break
        }

        // Database Insert (Pseudo-code for supabase)
        const { error } = await supabase
            .from('referrals')
            .insert({
                referrer_id: referrerId,
                referred_user_id: newUserId,
                status: 'completed',
                reward_amount: rewardAmount
            })

        if (error) console.error("Referral Error", error)

        return { success: !error, rewardAmount }
    }
}
