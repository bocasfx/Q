const { app, Menu } = require('electron');
const path = require('path');
const openAboutWindow = require('about-window');

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
            require('electron').shell.openExternal('https://github.com/bocasfx/Q');
          }
        }
      ]
    }
  ];

  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'aboot',
        label: 'Aboot Q',
        click: () => openAboutWindow.default({
          'icon_path': path.join(app.getAppPath(), 'resources/icon/icon.png'),
          license: 'Creative Commons (BY-NC-SA 4.0)',
          description: 'Nodular Synthesizer/Sequencer'
        })
      },
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
