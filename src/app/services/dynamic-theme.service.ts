
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
// import tinycolor from 'tinycolor2';
// var tinycolor = require("tinycolor2");
declare const tinycolor: any;

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

export interface ThemeModel {
  _id?: any;
  id: string | number;
  theme: string;
  label: string;
  isActive: boolean;
  primary?: string;
  accent?: string;
  warn?: string;
  toolBarBG?: string;
  toolBarText?: string;
  defaultThemeMode?:string,
  onHover?:string,
  onSelect?:string,

  footerBG?: string,
  footerText?: string,
}

@Injectable({
  providedIn: 'root'
})
export class DynamicThemeService {

  l:ThemeModel = {
    "id": 11,
    "theme": "default-theme",
    "label": "Default",
    "isActive": false,
    "primary": null,
    "accent": null,
    "warn": null,
    "toolBarBG": "#000000",
    "toolBarText": "#FFFFFF",
    "footerBG": "#f1f1f1",
    "footerText": "#000",
    "defaultThemeMode": "light",
    "onHover": null,
    "onSelect": null
}
  private themeModeChanged$: Subject<any> = new Subject<any>();
  private themeChanged$: Subject<any> = new Subject<any>();
  private predefinedThemes: ThemeModel[] = [
    { id: 9876111, label: "Default", theme: "default-theme", isActive: false },
    { id:9876112, label: "Indigo Pink", theme: "indigo-pink", isActive: false },
    { id:9876113, label: "Deeppurple Amber", theme: "deeppurple-amber", isActive: false },
    { id:9876114, label: "Purple Green", theme: "purple-green", isActive: false },
    // { id:"kfkdsfieir", label: "My Theme 1", theme: "dynamic-theme", isActive: false, primary:"red", accent:"green" },       
    // { id: "DYN_THM", label: "My Theme", theme: "dynamic-theme", isActive: false },
  ];
  userDefinedThemes: any[] = [];
  availableThemes: ThemeModel[] = [...this.userDefinedThemes, ...this.predefinedThemes];
  selectedTheme: ThemeModel = this.predefinedThemes[0];
  savedTheme: ThemeModel | null = null;

  themeModes = ["light", "dark"];
  currentThemeMode: "light" | "dark" = "light";

  public primaryColor = '#fecb01';//'#bb0000';

  public primaryColorPalette: Color[] = [];

  public secondaryColor = '#333333';//'#0000aa';

  public secondaryColorPalette: Color[] = [];

  public tertiaryColor = '#f44336';
  public tertiaryColorPalette: Color[] = [];

  public onHoverColor = '#525252';
  public onSelectColor ='#fdac00';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.checkBrowserLightDarkPreference();
  }

  checkBrowserLightDarkPreference() {

    var preference_query = window.matchMedia('(prefers-color-scheme: dark)');

    let checkPreference = (query:any) => {
      if (query.matches) {
        this.changeThemeMode("dark");
      } else {
        this.changeThemeMode("light");
      }
    }
    preference_query.addListener(checkPreference);

  }

  setAvailabeThemes(themes: ThemeModel[]) {
    this.userDefinedThemes = themes;
    this.availableThemes = [...this.userDefinedThemes, ...this.predefinedThemes];
    this.savedTheme = this.predefinedThemes.find(e => e.isActive) || this.predefinedThemes[0];
    // this.getThemeChangedSubject().next(this.availableThemes);
  }
  setAvailabeThemesAndNotify(themes: ThemeModel[]) {
    this.setAvailabeThemes(themes);
    this.getThemeChangedSubject().next(this.availableThemes);
  }
  getThemeModeChangedSubject() {
    return this.themeModeChanged$;
  }
  getThemeChangedSubject() {
    return this.themeChanged$;
  }
  setTheme(theme: ThemeModel = this.predefinedThemes[0], mode?:any) {
    this.selectedTheme = theme || this.predefinedThemes[0];

    if (!mode) {
      const browserPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const userPreferesDark = localStorage.getItem("data-theme");
      mode = userPreferesDark || (browserPrefersDark ? "dark" : "light");
    } 
    this.currentThemeMode = mode === "dark" ? "dark" : "light";
    this.getThemeModeChangedSubject().next(this.currentThemeMode);
    if (this.selectedTheme.theme == "dynamic-theme") {
      this.savePrimaryColor(theme.primary);
      this.saveSecondaryColor(theme.accent);
      this.saveTertiaryColor(theme.warn);

      this.saveHoverColor(theme.onHover, theme);
      this.saveSelectedBGColor(theme.onSelect, theme);

      this.saveHeaderFooterColor(theme.toolBarBG, theme, '--bg-app-bar');
      this.saveHeaderFooterColor(theme.toolBarText, theme, '--text-app-bar');
      this.saveHeaderFooterColor(theme.footerBG, theme, '--footer-bg');
      this.saveHeaderFooterColor(theme.footerText, theme, '--footer-text');

    }
    this.applyTheme();
  }

  private applyTheme() {
    this.document.documentElement.setAttribute('data-theme', this.currentThemeMode);
    this.document.body.className = (this.selectedTheme.theme || "default-theme" || this.predefinedThemes[0].theme) + (this.currentThemeMode == "dark" ? "-dark" : "");
  }

  toggleThemeMode() {
    const mode = this.isDarkMode() ? "light" : "dark";
    this.changeThemeMode(mode);
    localStorage.setItem("data-theme", mode);
  }

  changeThemeMode(mode: "light" | "dark" = "light") {
    this.currentThemeMode = mode;
    this.themeModeChanged$.next(this.currentThemeMode);
    this.applyTheme()
  }

  isDarkMode(): boolean {
    return this.currentThemeMode === "dark"
  }

  saveHeaderFooterColor(colorCode:any, theme:ThemeModel, variableName){
    if(colorCode && variableName) {
      this.document.body.style.setProperty(variableName, colorCode);
    }
  }

  saveHoverColor(colorCode:any, theme:ThemeModel){
    if(colorCode) {
      this.document.body.style.setProperty('--bg-hover', colorCode);
    } else {
      const p900 = tinycolor(theme.primary).darken(24);
      this.document.body.style.setProperty("--bg-hover", p900)
      // this.document.body.style.removeProperty("--bg-hover");
    }
  }
  saveSelectedBGColor(colorCode:any, theme:ThemeModel){
    if(colorCode) {
      this.document.body.style.setProperty("--bg-selected", colorCode);
    } else {
      const p900 = tinycolor(theme.primary).darken(24) ||this.document.body.style.getPropertyValue("--p900");
      this.document.body.style.setProperty("--bg-selected", p900)
    }
  }
  savePrimaryColor(primaryColor:any) {
    this.primaryColor = primaryColor;
    this.primaryColorPalette = computeColors(this.primaryColor);

    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveSecondaryColor(secondaryColor:any) {
    this.secondaryColor = secondaryColor;

    this.secondaryColorPalette = computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key1 = `--theme-accent-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-accent-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveTertiaryColor(tertiaryColor:any) {
    this.tertiaryColor = tertiaryColor;

    this.tertiaryColorPalette = computeColors(this.tertiaryColor);

    for (const color of this.tertiaryColorPalette) {
      const key1 = `--theme-tertiary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-tertiary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  computeColors(hex: string) {
    return computeColors(hex);
  }
}


function computeColors(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), '50'),
    getColorObject(tinycolor(hex).lighten(37), '100'),
    getColorObject(tinycolor(hex).lighten(26), '200'),
    getColorObject(tinycolor(hex).lighten(12), '300'),
    getColorObject(tinycolor(hex).lighten(6), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(6), '600'),
    getColorObject(tinycolor(hex).darken(12), '700'),
    getColorObject(tinycolor(hex).darken(18), '800'),
    getColorObject(tinycolor(hex).darken(24), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
  ];
}

function getColorObject(value:any, name:any): Color {
  const c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
}
