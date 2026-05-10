// GitHub Achievements Tracker - Go Version
// Concurrent achievement tracking

package achievements

import (
	"fmt"
	"time"
)

// Achievement represents a single GitHub achievement
type Achievement struct {
	Name        string
	Unlocked    time.Time
	Description string
}

// AchievementsTracker manages multiple achievements
type AchievementsTracker struct {
	achievements []Achievement
}

// New creates a new AchievementsTracker
func New() *AchievementsTracker {
	return &AchievementsTracker{
		achievements: make([]Achievement, 0),
	}
}

// AddAchievement adds a new achievement to the tracker
func (at *AchievementsTracker) AddAchievement(name string, unlocked time.Time, description string) {
	at.achievements = append(at.achievements, Achievement{
		Name:        name,
		Unlocked:    unlocked,
		Description: description,
	})
}

// ListAchievements prints all achievements
func (at *AchievementsTracker) ListAchievements() {
	for _, achievement := range at.achievements {
		fmt.Printf("✓ %s - %s\n", achievement.Name, achievement.Unlocked.Format("2006-01-02"))
		if achievement.Description != "" {
			fmt.Printf("  %s\n", achievement.Description)
		}
	}
}

// Count returns the total number of achievements
func (at *AchievementsTracker) Count() int {
	return len(at.achievements)
}
