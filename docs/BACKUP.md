# Backup and Recovery Guide

This guide covers backup and recovery procedures for the GitHub Achievements Tracker project.

## Backup Strategy

### What to Backup

#### Repository Data
- Source code
- Documentation
- Configuration files
- Issues and discussions
- Release information

#### External Data
- Wiki pages
- Project settings
- Webhooks
- Branch protection rules

## Backup Methods

### 1. Git Cloning (Complete Repository)

```bash
# Clone the entire repository
git clone --mirror git@github.com:CoderSixSix/test-achievements.git backup-dir

# Update backup
cd backup-dir
git remote update
```

### 2. GitHub Archive (Releases)

GitHub automatically archives releases. Additional backup:

```bash
# Download all releases
gh release list --limit 100 | while read line; do
    tag=$(echo $line | awk '{print $3}')
    gh release download $tag --dir releases-backup/
done
```

### 3. Issues and Discussions Backup

```bash
# Backup issues
gh issue list --limit 1000 --json title,body,comments > issues-backup.json

# Backup discussions
gh api graphql -f query='
query {
  repository(owner: "CoderSixSix", name: "test-achievements") {
    discussions(first: 100) {
      nodes {
        title
        body
        comments(first: 10) {
          nodes {
            body
          }
        }
      }
    }
  }
}' > discussions-backup.json
```

### 4. Wiki Backup

```bash
# Clone wiki repository
git clone git@github.com:CoderSixSix/test-achievements.wiki.git wiki-backup
```

## Automated Backups

### GitHub Actions Backup Workflow

Create `.github/workflows/backup.yml`:

```yaml
name: Repository Backup

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Backup Issues
        run: gh issue list --json title,body > backup/issues-$(date +%Y%m%d).json
      - name: Upload Backup
        uses: actions/upload-artifact@v3
        with:
          name: backup-${{ github.run_number }}
          path: backup/
```

## Recovery Procedures

### Restore from Git Backup

```bash
# Create new repository
gh repo create test-achievements-restored --public

# Push backup to new repository
cd backup-dir
git push --mirror git@github.com:CoderSixSix/test-achievements-restored.git
```

### Restore Issues

```bash
# Create issues from backup
cat issues-backup.json | jq -r '.[] | "\(.title)\n\(.body)"' | while IFS='\n' read -r title body; do
    gh issue create --title "$title" --body "$body"
done
```

## Backup Schedule

### Recommended Frequency
- **Code**: Automatic (every push)
- **Issues**: Weekly
- **Discussions**: Monthly
- **Releases**: Per release
- **Wiki**: Monthly

### Storage Locations
- Local machine
- Cloud storage (AWS S3, Google Drive)
- GitHub (private repository)
- Off-site backup

## Best Practices

### Security
- Encrypt sensitive backups
- Store credentials separately
- Use secure transfer protocols
- Regular backup testing

### Testing
- Verify backup integrity
- Test restore procedures
- Document recovery time
- Keep backups up to date

### Retention
- Keep daily backups for 1 week
- Keep weekly backups for 1 month
- Keep monthly backups for 1 year

## Emergency Contacts

In case of emergency:
1. Contact repository owner
2. Check recent backups
3. Coordinate recovery effort
4. Document the incident

---

**Last Updated**: 2026-05-10
**Next Review**: 2026-08-10

Be prepared! Backup regularly! 🔄💾
