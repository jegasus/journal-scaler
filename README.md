![](https://img.shields.io/badge/Foundry-v0.7.9-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/jegasus/journal-scaler/latest/module.zip?label=Downloads+latest+release) 
![GitHub All Releases](https://img.shields.io/github/downloads/jegasus/journal-scaler/total?label=Downloads+total)  
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fjournal-scaler&colorB=4aa94a)


# Journal Scaler
A [FoundryVTT](https://foundryvtt.com/) module that enables you to change the font sizes inside journal windows using <kbd>ctrl</kbd>+`mouseWheelUp` and <kbd>ctrl</kbd>+`mouseWheelDown`.

# Instructions
- Step 1: activate this module in your world 
- Step 2: hover your mouse cursor over a journal sheet window
- Step 3: hold down `ctrl` and use your mouse wheel to scroll either up or down to increase or decrease the font sizes, respectively

**Note**: The Journal Scaler also allows you to zoom in and out of Journal Images.

![Journal scaler in action](img/module_in_action.gif)

![Journal scaler in action](img/module_in_action_2.gif)

# Changelog

## 0.0.6 - Released on 2021-04-08
Added new feature! The module now allows users to Zoom in and out of Journal Images.

Very special thanks to [JeansenVaars](https://github.com/saif-ellafi) (Discord user: JeansenVaars#2857) for generously offering the chunks of code needed to add this functionality to the module.

## 0.0.5 - Released on 2021-01-30
Fixed Firefox bug. Now module works in Chrome and Firefox.

## 0.0.4 - Released on 2021-01-08
Now using updated `shim.js` from [libWrapper v1.3.4.0](https://github.com/ruipin/fvtt-lib-wrapper/releases/tag/v1.3.4.0).

Fixed wrapper type from `MIXED` to `WRAPPER`.

## 0.0.3 - Released on 2021-01-02
Real for scaling bug when journal window was open but not hovered by the mouse.

## 0.0.2 - Released on 2021-01-02
Hotfix for scaling bug when journal window was open but not hovered by the mouse.

## 0.0.1 - Released on 2021-01-01
Initial release. 

Got the basic funtionality to work.

# Acknowledgements

## LoFD's Module Template
This module relied heavily on [The League of Foundry Developer's FoundryVTT Module Template](https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template). This is a great resource to get started in developing cool stuff for FoundryVTT!

## ruipin's libWrapper
This module uses [ruipin's libWrapper library](https://github.com/ruipin/fvtt-lib-wrapper). Take a look at his stuff if you want to develop modules for FVTT that override its default behaviors.

## JeansenVaars
Special thanks to [JeansenVaars](https://github.com/saif-ellafi) (Discord user JeansenVaars#2857) who generously provided the code for the journal image zoom functinality. 

