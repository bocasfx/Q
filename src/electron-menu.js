const { app, Menu } = require('electron');

function setMainMenu() {

  const template = [
    // {
    //   label: 'Edit',
    //   submenu: [
    //     {role: 'undo'},
    //     {role: 'redo'},
    //     {type: 'separator'},
    //     {role: 'cut'},
    //     {role: 'copy'},
    //     {role: 'paste'},
    //     {role: 'pasteandmatchstyle'},
    //     {role: 'delete'},
    //     {role: 'selectall'}
    //   ]
    // },
    // {
    //   label: 'View',
    //   submenu: [
    //     {role: 'reload'},
    //     {role: 'forcereload'},
    //     {role: 'toggledevtools'},
    //     {type: 'separator'},
    //     {role: 'resetzoom'},
    //     {role: 'zoomin'},
    //     {role: 'zoomout'},
    //     {type: 'separator'},
    //     {role: 'togglefullscreen'}
    //   ]
    // },
    {
      role: 'window',
      submenu: [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'},
        {type: 'separator'}
        // {
        //   label: 'Mixer',
        //   click() {
        //     console.log('Mixer');
        //   }
        // }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { 
            require('electron').shell.openExternal('https://electron.atom.io');
          }
        }
      ]
    }
  ];

  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = {
  setMainMenu
};
