#!/bin/bash

# GitHub Achievements Automation Script
# This script helps automate common GitHub tasks

set -e

echo "🚀 GitHub Achievements Automation Script"
echo "=========================================="

# Function to create a new issue
create_issue() {
    local title="$1"
    local body="$2"
    gh issue create --title "$title" --body "$body"
    echo "✅ Issue created: $title"
}

# Function to create a new discussion
create_discussion() {
    local title="$1"
    local body="$2"
    gh api graphql -f query="
    mutation {
        createDiscussion(input: {
            repositoryId: \"R_kgDOSZKWcg\",
            categoryId: \"DIC_kwDOSZKWcs4C8tNr\",
            title: \"$title\",
            body: \"$body\"
        }) {
            discussion {
                id
                title
                url
            }
        }
    }"
    echo "✅ Discussion created: $title"
}

# Main menu
echo "Select an action:"
echo "1. Create an issue"
echo "2. Create a discussion"
echo "3. Exit"

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        read -p "Enter issue title: " title
        read -p "Enter issue body: " body
        create_issue "$title" "$body"
        ;;
    2)
        read -p "Enter discussion title: " title
        read -p "Enter discussion body: " body
        create_discussion "$title" "$body"
        ;;
    3)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo "✨ Automation complete!"
