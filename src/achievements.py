#!/usr/bin/env python3
"""
GitHub Achievements Tracker
A simple script to track GitHub achievements
"""

class AchievementsTracker:
    def __init__(self):
        self.achievements = []
    
    def add_achievement(self, name, unlocked_date):
        """Add a new achievement"""
        self.achievements.append({
            'name': name,
            'unlocked': unlocked_date
        })
    
    def list_achievements(self):
        """List all achievements"""
        for achievement in self.achievements:
            print(f"✓ {achievement['name']} - {achievement['unlocked']}")
    
    def count(self):
        """Return total number of achievements"""
        return len(self.achievements)

if __name__ == "__main__":
    tracker = AchievementsTracker()
    print("GitHub Achievements Tracker 🏆")
    print("Track your GitHub achievements here!")
