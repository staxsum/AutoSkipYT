# AutoSkipYT  

A Tampermonkey userscript that automatically skips YouTube ads.  

## Features  
- Clicks skip buttons on skippable ads  
- Seeks through unskippable ads  
- Works on all YouTube pages  

## Installation  
1. Install [Tampermonkey](https://www.tampermonkey.net/)  
2. Click "Create a new script"  
3. Paste the contents of `autoskipyt.js`  
4. Save and refresh YouTube  

## How It Works  
- Checks for ads every **500ms**  
- Detects both `.ytp-ad-skip-button-modern` and older skip buttons  
- Seeks to end if no skip button is found  

## Troubleshooting  
- If ads aren't skipped, check the console for errors (`Ctrl+Shift+J`).  
- Update the script if YouTube changes its ad elements.  

## License  
MIT (Free to use and modify)  
