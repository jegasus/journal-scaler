import { libWrapper } from './shim.js';

const MODULE_ID = 'journal-scaler';
const MODULE_NAME = "Journal Scaler";

function getSetting (settingName) {
  return game.settings.get(MODULE_ID, settingName)
}

//CONFIG.debug.hooks = true;
console.log("IF YOU USE THIS MODULE YOU WILL VOMIT A WEDDING!!!!")

// Overriding original mousewheel behavior
Hooks.once('setup', function () {
    libWrapper.register(
      MODULE_ID,
      'KeyboardManager.prototype._onWheel',
        function(existing_onWheel, event) {
          _onWheel_override.bind(this)(event);
          return existing_onWheel.bind(this)(event);
      },
      'WRAPPER',
    )
  }
)

// renderJournalSheet triggers on new opened Journal Sheets, pre-loaded ones and/or GM Sheet journals
// this functionality tags all of these sheets that have an image, with mouse controls for zoom in and out
Hooks.on('renderJournalSheet', function() {
  let journal_images = document.getElementsByClassName('lightbox-image');
  let sensitivity = 2; // Configurable?
  let pos_x;
  let pos_y;
  let init_x;
  let init_y;
  // Make sure all open journal sheet images receive this functionality (GM Screen support, and other triggers)
  for (var i = 0; i < journal_images.length; i++) {
    let journal_image = journal_images[i];
    let is_holding = false;
    // Event Listener that triggers on mousedown of RIGHT click (we could also use middle-mouse button?)
    journal_image.addEventListener("mousedown", (event) => {
      if (!is_holding && event.button === 2) {
        is_holding = true;
        journal_image.style.cursor = 'move';
        let pos_x_str = journal_image.style.backgroundPositionX;
        let pos_y_str = journal_image.style.backgroundPositionY;
        pos_x = pos_x_str == '' ? 50 : Number(pos_x_str.slice(0, pos_x_str.length-1));
        pos_y = pos_y_str == '' ? 50 : Number(pos_y_str.slice(0, pos_y_str.length-1));
        init_x = event.offsetX;
        init_y = event.offsetY;
      }
    });
    journal_image.addEventListener("mousemove", (event) => {
      if (is_holding) {
        // update position based on last position offset
        journal_image.style.backgroundPositionX = `${pos_x + (event.offsetX - init_x)/sensitivity}%`;
        journal_image.style.backgroundPositionY = `${pos_y + (event.offsetY - init_y)/sensitivity}%`;
      }
    });
    // release and restore cursor on mouse release
    document.addEventListener("mouseup", (event) => {
      if (is_holding) {
        is_holding = false;
        journal_image.style.cursor = '';
      }
    });
  }
})


// Function that overrides the original mousewheel behavior.
// Original function: KeyboardManager._onWheel, line 2834 from foundry.js
function _onWheel_override(event){
  // Check if control is pressed.
  // If not, just exit the function.
  if (event.ctrlKey == false) { return; };

  // Get the list of all windows currently open that are journal-sheet windows
  let jrn_sheet_windows = document.getElementsByClassName('sheet journal-sheet');

  // If there are none, just exit the function.
  if (jrn_sheet_windows.length == 0) {
    return;
  };

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

  // Check if this is an image journal entry or just regular text
  if (journal_win.querySelector('.lightbox-image')) {
    _onWheel_imageResize(journal_win, which_dir);
  } else {
    _onWheel_textResize(journal_win, which_dir);
  }

  return
}


// Increases font size of journal entries depending on the direction
function _onWheel_textResize(journal_win, which_dir) {
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
}

// Increases image size of image journal entries depending on the direction
function _onWheel_imageResize(journal_win, which_dir) {
  // Get the DOM element of the image and change its style
  let journal_image = journal_win.getElementsByClassName('lightbox-image')[0];
  let current_size_str = journal_image.style.backgroundSize;
  let current_size = current_size_str.includes("%") ? Number(current_size_str.slice(0, current_size_str.length-1)) : 100;
  if (which_dir == 'bigger') {
    journal_image.style.backgroundSize = `${String(current_size + 5)}%`
  }
  else {
    journal_image.style.backgroundSize = `${String(current_size - 5)}%`
  }
}
