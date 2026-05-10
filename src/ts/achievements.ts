/**
 * GitHub Achievements Tracker - TypeScript Version
 * Strongly typed achievement tracking
 */

interface Achievement {
    name: string;
    unlocked: Date;
    description?: string;
}

class AchievementsTracker {
    private achievements: Achievement[] = [];

    /**
     * Add a new achievement
     */
    addAchievement(name: string, unlocked: Date, description?: string): void {
        this.achievements.push({
            name,
            unlocked,
            description
        });
    }

    /**
     * List all achievements
     */
    listAchievements(): void {
        this.achievements.forEach(achievement => {
            console.log(`✓ ${achievement.name} - ${achievement.unlocked.toISOString()}`);
            if (achievement.description) {
                console.log(`  ${achievement.description}`);
            }
        });
    }

    /**
     * Get total number of achievements
     */
    count(): number {
        return this.achievements.length;
    }

    /**
     * Get achievement by name
     */
    getAchievement(name: string): Achievement | undefined {
        return this.achievements.find(a => a.name === name);
    }
}

export { AchievementsTracker, Achievement };
