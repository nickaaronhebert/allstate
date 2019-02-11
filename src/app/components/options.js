const options = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    leftIcon: 'ios-laptop'
  },
  {
    key: 'policy',
    label: 'Policy Management',
    leftIcon: 'md-list',
    children: [
      {
        key: 'policies',
        label: 'Policies',
        leftIcon: 'md-list',
      },
      {
        key: 'policyQuestions',
        label: 'Policy Questions',
        leftIcon: 'md-list',
      }
    ]
  },
  {
    key: 'controls',
    label: 'Control Management',
    children: [
      {
        key: 'hipaaControls',
        label: 'Hippa Controls',
        leftIcon: 'md-list',
      },
      {
        key: 'nistControls',
        label: 'Nist Controls',
        leftIcon: 'md-list',
      },
      {
        key: 'controlMappings',
        label: 'Control Mappings',
        leftIcon: 'md-list',
      }
    ],
    leftIcon: 'md-repeat' // ios-repeat
  },
  {
    key: 'issues',
    label: 'Issue Management',
    children: [
      {
        key: 'issueTypes',
        label: 'Issue Types',
        leftIcon: 'md-list',
      },
    ],
    leftIcon: 'md-repeat' // ios-repeat
  },
  {
    key: 'organizations',
    label: 'Organization Management',
    leftIcon: 'md-checkbox-outline' // md-checkbox-outline  ios-clipboard // ios-document-outline
  },
  {
    key: 'user',
    label: 'User Management',
    leftIcon: 'ios-person' // ios-warnin g
  },
  {
    key: 'settings',
    label: 'Settings',
    leftIcon: 'md-settings'
  }
];
export default options;
