import { libWrapper } from './shim.js';

const MODULE_ID = 'journal-scaler';
const MODULE_NAME = "Journal Scaler";

function getSetting (settingName) {
  return game.settings.get(MODULE_ID, settingName)
}

//CONFIG.debug.hooks = true;

console.log("IF YOU USE THIS MODULE YOU WILL VOMIT A WEDDING!!!!")

// Need to edit this function:
// KeyboardManager._onWheel, line 2834 from foundry.js

function _onWheel_override(event){
  //console.log("NOW WE'RE REALLY IN THERE, BABY!!!!");

  // Check if control is pressed.
  // If not, just exit the function.
  if (event.ctrlKey == false) { return; };

  // Get the list of all windows currently open that are journal-sheet windows
  let jrn_sheet_windows = document.getElementsByClassName('app window-app sheet journal-sheet');
  
  // If there are none, just exit the function.
  if (jrn_sheet_windows.length == 0) { return; };
  
  // Trying to find the window hovered with the mouse 
  // among the opened journal sheet windows.
  let i;
  let journal_win;
  let foundit = false;
  for (i = 0; i < jrn_sheet_windows.length; i++){
    journal_win = jrn_sheet_windows[i];
    if (journal_win.contains(event.target)){
      foundit = true;
      break;
    }
  };
  
  // If the window hovered with the mouse isn't found among the all of the
  // open journal sheet windows, just exit the program.
  if (foundit == false) { return; };
  
  // If the code reaches this point, we know that the hovered window is a 
  // journal sheet window, and that the ctrl key was pressed when scrolling.
  // Therefore, we can increase/decrease the font size!
  
  // Find the direction of the mousewheel scroll
  let which_dir = '';
  if ((event.wheelDelta > 0) | (event.deltaY < 0)){
    which_dir = 'bigger';
  }
  else if ((event.wheelDelta < 0) | (event.deltaY > 0)) {
    which_dir = 'smaller';
  }

  // Get the DOM element of the journal editor and change its style
  let journal_editor = journal_win.getElementsByClassName('editor-content')[0]
  let current_size_str = journal_editor.style.fontSize
  let current_size = current_size_str == '' ? 14 : Number(current_size_str.slice(0,current_size_str.length-2));
  if (which_dir == 'bigger') {
    journal_editor.style.fontSize = `${String(current_size + 1)}px`
  }
  else {
    journal_editor.style.fontSize = `${String(current_size - 1)}px`
  }
  return
}

Hooks.once('setup', function () {
    libWrapper.register( 
      MODULE_ID, 
      'KeyboardManager.prototype._onWheel', 
        function(existing_onWheel, event) {
          //event.preventDefault();
          //console.log("I'M IN, BABY! BOO-MUTHA-FUCKIN'-YAAA!!!")
          _onWheel_override.bind(this)(event);
          return existing_onWheel.bind(this)(event);
      },
      'WRAPPER',
    )
  }
)

