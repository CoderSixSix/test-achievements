/**
 * GitHub Achievements Tracker - JavaScript Version
 * Track your GitHub achievements with this simple JavaScript module
 */

class AchievementsTracker {
    constructor() {
        this.achievements = [];
    }

    /**
     * Add a new achievement
     * @param {string} name - Achievement name
     * @param {string} unlockedDate - Date when achievement was unlocked
     */
    addAchievement(name, unlockedDate) {
        this.achievements.push({
            name,
            unlocked: unlockedDate
        });
    }

    /**
     * List all achievements
     */
    listAchievements() {
        this.achievements.forEach(achievement => {
            console.log(`✓ ${achievement.name} - ${achievement.unlocked}`);
        });
    }

    /**
     * Get total number of achievements
     * @returns {number} Total count
     */
    count() {
        return this.achievements.length;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementsTracker;
}
