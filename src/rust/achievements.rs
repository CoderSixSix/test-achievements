// GitHub Achievements Tracker - Rust Version
// Safe, fast achievement tracking

use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Achievement {
    pub name: String,
    pub unlocked: String,
    pub description: Option<String>,
}

pub struct AchievementsTracker {
    achievements: Vec<Achievement>,
}

impl AchievementsTracker {
    pub fn new() -> Self {
        AchievementsTracker {
            achievements: Vec::new(),
        }
    }

    pub fn add_achievement(&mut self, name: String, unlocked: String, description: Option<String>) {
        self.achievements.push(Achievement {
            name,
            unlocked,
            description,
        });
    }

    pub fn list_achievements(&self) {
        for achievement in &self.achievements {
            println!("✓ {} - {}", achievement.name, achievement.unlocked);
            if let Some(desc) = &achievement.description {
                println!("  {}", desc);
            }
        }
    }

    pub fn count(&self) -> usize {
        self.achievements.len()
    }
}

impl Default for AchievementsTracker {
    fn default() -> Self {
        Self::new()
    }
}

fn main() {
    let mut tracker = AchievementsTracker::new();
    println!("GitHub Achievements Tracker 🏆");
    println!("Track your achievements in Rust!");
}
