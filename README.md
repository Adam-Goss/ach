# ACH Digital Workbench

A professional web application for conducting **Analysis of Competing Hypotheses (ACH)** methodology. This tool provides a structured approach to evaluating multiple explanations using evidence and logic, making it ideal for intelligence analysis, threat assessment, and decision-making processes.

![ACH Digital Workbench](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Technology](https://img.shields.io/badge/Tech-HTML%2FCSS%2FJS-orange)

## 🎯 What is ACH?

The **Analysis of Competing Hypotheses (ACH)** is a structured technique for evaluating multiple explanations using evidence and logic. It helps analysts avoid cognitive biases and provides a systematic approach to complex analytical problems.

**Key Benefits:**
- Reduces cognitive bias in analysis
- Provides systematic evaluation framework
- Creates transparent analytical reasoning
- Supports evidence-based decision making

## ✨ Features

### 🧠 **Hypothesis Management**
- Create and manage multiple competing hypotheses
- Edit hypothesis titles and descriptions
- Real-time updates and auto-save functionality
- Clean, intuitive interface for hypothesis creation

### 🗃️ **Evidence Locker**
- Store and categorize evidence with detailed metadata
- Source reliability ratings (A-F scale)
- Information credibility assessments (1-6 scale)
- Admiralty Code integration for intelligence analysis
- Evidence activation/deactivation for sensitivity analysis

### 🗂️ **ACH Matrix**
- Interactive matrix for consistency analysis
- Five-level consistency ratings: Very Consistent (CC) to Very Inconsistent (II)
- Visual color coding for quick pattern recognition
- Keyboard navigation support for accessibility
- Evidence toggle controls for sensitivity analysis

### 📊 **Results Dashboard**
- Automated inconsistency scoring
- Most likely hypothesis ranking
- Key evidence identification
- Visual progress indicators
- Real-time analysis updates

### 💾 **Project Management**
- Save multiple analysis projects
- Project reset and deletion capabilities
- Automatic data persistence
- Cross-session data retention

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/ach-digital-workbench.git
   cd ach-digital-workbench
   ```

2. **Open the application**
   ```bash
   # Option 1: Direct file opening
   open src/index.html
   
   # Option 2: Local server (recommended)
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/src/
   ```

3. **Start analyzing!**
   - Create your first project
   - Add hypotheses
   - Input evidence
   - Build your ACH matrix

## 📖 Usage Examples

### Example 1: Threat Intelligence Analysis

**Scenario:** Analyzing potential cyber threats to a corporate network

**Step 1: Define Hypotheses**
```
H1: Advanced Persistent Threat (APT) group targeting our organization
H2: Opportunistic cybercriminals exploiting known vulnerabilities
H3: Insider threat with elevated access
H4: False positive indicators from security tools
```

**Step 2: Collect Evidence**
```
Evidence 1: Unusual network traffic patterns from Eastern European IPs
- Source: Network monitoring logs
- Reliability: B (Usually reliable)
- Credibility: 2 (Probably true)

Evidence 2: Employee reported suspicious emails with malicious attachments
- Source: User incident report
- Reliability: A (Completely reliable)
- Credibility: 1 (Confirmed by other sources)
```

**Step 3: Matrix Analysis**
- Rate each evidence-hypothesis relationship
- Use consistency ratings (CC, C, N/A, I, II)
- Review automated scoring results

### Example 2: Business Decision Analysis

**Scenario:** Evaluating market entry strategies

**Hypotheses:**
```
H1: Direct market entry with full investment
H2: Joint venture with local partner
H3: Gradual market entry with minimal investment
H4: Delay entry until market conditions improve
```

**Evidence Collection:**
- Market research reports
- Competitor analysis
- Financial projections
- Regulatory requirements
- Customer surveys

### Example 3: Incident Response Analysis

**Scenario:** Investigating a security incident

**Hypotheses:**
```
H1: External attacker gained unauthorized access
H2: Malware infection from phishing campaign
H3: System misconfiguration exploited
H4: Legitimate user account compromised
```

## 🎮 How to Use the Application

### 1. **Creating a New Analysis**
1. Click "New Analysis" in the sidebar
2. Enter a project name
3. Start building your analysis

### 2. **Adding Hypotheses**
1. Click "Add Hypothesis" in the Hypotheses section
2. Edit the title and description
3. Add multiple competing hypotheses

### 3. **Inputting Evidence**
1. Click "Add Evidence" in the Evidence Locker
2. Enter evidence statement and source
3. Rate source reliability (A-F) and information credibility (1-6)
4. Add multiple pieces of evidence

### 4. **Building the ACH Matrix**
1. Review the automatically generated matrix
2. Click cells to cycle through consistency ratings:
   - **CC**: Very Consistent (green)
   - **C**: Consistent (light green)
   - **N/A**: Not Applicable (gray)
   - **I**: Inconsistent (orange)
   - **II**: Very Inconsistent (red)

### 5. **Analyzing Results**
1. Review the Results Dashboard
2. Check hypothesis rankings
3. Identify key evidence pieces
4. Use sensitivity analysis by toggling evidence

### 6. **Managing Projects**
- **Save**: Automatic saving to browser storage
- **Reset**: Clear all data while keeping project
- **Delete**: Permanently remove project
- **Rename**: Double-click project name to edit

## 🛠️ Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS framework
- **Storage**: Local Storage for data persistence
- **Deployment**: GitHub Pages ready

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### File Structure
```
ach-digital-workbench/
├── src/
│   ├── index.html          # Main application
│   ├── app.js             # Core application logic
│   ├── dropdown.js        # UI components
│   ├── style.css          # Custom styles
│   └── media/             # Images and assets
├── README.md              # This file
└── package.json           # Dependencies
```

## 🔧 Customization

### Adding Custom Styles
Edit `src/style.css` to customize:
- Color schemes
- Animations
- Layout adjustments
- Responsive design

### Extending Functionality
Modify `src/app.js` to add:
- New analysis features
- Export capabilities
- Additional scoring algorithms
- Integration with external APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project was created by **[Kraven Security](https://kravensecurity.com/)** for cyber threat intelligence coaching and consultation needs.

## 🆘 Support

- **Documentation**: [ACH Methodology Guide](https://kravensecurity.com/analysis-of-competing-hypotheses/)
- **Issues**: Report bugs via GitHub Issues
- **Contact**: [Kraven Security](https://kravensecurity.com/contact/)

## 🙏 Acknowledgments

- Based on the Analysis of Competing Hypotheses methodology
- Inspired by intelligence analysis best practices
- Built for the cybersecurity and threat intelligence community

---

**Ready to improve your analytical thinking?** Start using the ACH Digital Workbench today! 🚀