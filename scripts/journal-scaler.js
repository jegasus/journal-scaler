import { libWrapper } from './shim.js';

const MODULE_ID = 'journal-scaler';
const MODULE_NAME = "Journal Scaler";

function getSetting (settingName) {
  return game.settings.get(MODULE_ID, settingName)
}



CONFIG.debug.hooks = true;

console.log("IF YOU USE THIS MODULE YOU WILL VOMIT A WEDDING")
console.log("BUT SERIOUSLY THO?!?!??! FUUUUUUUUUCK")


// Need to edit this function:
// KeyboardManager._onWheel, line 2834 from foundry.js
// 



const MAX_ZOOM_OUT = 0.1;

//let textElement = document.getElementById('text-annotation');
//let zoom = 1;

/*
function renderText() {
    textElement.innerText = zoom;
};
*/
//function onMouseWheel(e) {
//  const delta = (e.wheelDelta && e.wheelDelta / 40) || -e.detail;
//  zoom = Math.max(MAX_ZOOM_OUT, zoom + (delta / 100))
//  renderText();
//}

//document.addEventListener('mousewheel', onMouseWheel)
//document.addEventListener('DOMMouseScroll', onMouseWheel) // FirefoxrenderText();

/*
function renderText() {
  const preciseFontSize = FONT_SIZE * zoom;  // Desired font size
  const roundedSize = Math.floor(preciseFontSize);
  const s = preciseFontSize / roundedSize; // Remaining scale
  
  textElement.style.fontSize = `${roundedSize}px`;  
  const scale = `scale(${s})`;  
  textElement.style.transform = scale;
}
*/


Hooks.once('init', async function() {

});

function _onWheel_override(event){
  console.log("NOW WE'RE REALLY IN THERE, BABY!!!!");
  
  let textElement = document.getElementById('journal-4haVU7wRmVLVYru8');

  console.log(textElement.style.fontSize);
  
  return
}

Hooks.once('setup', function () {
    libWrapper.register( 
      MODULE_ID, 
      'KeyboardManager.prototype._onWheel', 
        function(existing_onWheel, event) {
          event.preventDefault();
          console.log("I'M IN, BABY! BOO-MUTHA-FUCKIN'-YAAA!!!")
          _onWheel_override.bind(this)(event);
          //const element = event.currentTarget;
          //const entityId = element.parentElement.dataset.entityId;
          //const entity = this.constructor.collection.get(entityId);
  
          //if (entity.entity == "Scene") {
          //  entity.view();
          //}
          //else return existing_onWheel.bind(this)(event)
          return existing_onWheel.bind(this)(event);
      },
      'MIXED',
    )
  })

  Hooks.once('ready', async function() {

  });