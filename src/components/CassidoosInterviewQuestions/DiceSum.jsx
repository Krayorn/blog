export const DiceSum = () => {
    const diceSum = (dies, faces, target) => {
        if (target < dies || target > dies * faces) {
            return 0;
        }
    
        const dp = Array.from({ length: dies + 1 }, () => Array(target + 1).fill(0));
    
        for (let i = 1; i <= faces && i <= target; i++) {
            dp[1][i] = 1;
        }

        for (let dice = 2; dice <= dies; dice++) {
            for (let dice_value = 1; dice_value <= target;dice_value++) {
                for (let i = 1; i <= faces && i < dice_value; i++) {
                    dp[dice][dice_value] += dp[dice - 1][dice_value - i];
                }
            }
        }
    
        return dp[dies][target];
    }

    return (
        <div>
            Dice Sum
            {diceSum(1, 6, 3)}
            {diceSum(3, 6, 7)}
        </div>
    )
}