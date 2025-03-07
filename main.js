console.log("Electron - Processo principal")


const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')


let win
const createWindow = () => {
  
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    
    width: 1010,
    
    height: 720,
    //frame: false,
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true
  })

  
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  
  win.loadFile('./src/views/index.html')
}


function aboutWindow() {
  nativeTheme.themeSource='light'
  
  const mainWindow = BrowserWindow.getFocusedWindow()
  
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 280,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      
      parent: mainWindow,

      
      modal: true
    })
  }
  
  about.loadFile('./src/views/sobre.html')
}

//inicialização da aplicação (assincronismo, ou seja o ".then" indica o assincronismo)
app.whenReady().then(() => {
  createWindow()

  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.commandLine.appendSwitch('log-level','3')


const template = [
  {
    label: 'Cadastro',
    submenu: [
      
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },

  {
    label: 'Relatório',
    submenu: [
      
      {
        label: 'Clientes',
        
      },

      {
        type: 'separator'
      }
    ]
  },

  {
    label: 'Ferramentas',
    submenu:[
      {
        label:'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label:'Reduzir',
        role: 'zoomOut'
      },
      {
        label:'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label:'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },

  {
    label: 'Ajuda',
    submenu:[
      {
        label:'Repositório',
        click: () => shell.openExternal('https://github.com/ElenGrecco/stickynotes')
      },
      {
        label:'Sobre',
        click: () => aboutWindow()
      }
      
    ]
  }

]