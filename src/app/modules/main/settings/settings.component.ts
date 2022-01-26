import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Color, DynamicThemeService, ThemeModel } from 'src/app/services/dynamic-theme.service';
import { AppService } from 'src/app/app.service';
import { TenantService } from 'src/app/tenant/tenant.service';
@Component({
  selector: 'multi-tenant-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  primaryColor = this.themeService.primaryColor;
  secondaryColor = this.themeService.secondaryColor;
  tertiaryColor = this.themeService.tertiaryColor;
  dynamicThemeLabel!:any;

  dynamicThemeForm: FormGroup;
  dynamicThemeFormConfig = {
    label: ["", Validators.required],
    primary: [this.themeService.primaryColor, Validators.required],
    accent: [this.themeService.secondaryColor, Validators.required],
    warn: [this.themeService.tertiaryColor, Validators.required],
    theme: ["dynamic-theme"],
    isActive: true,
    // defaultThemeMode:["light"],
    onHover:["#525252"],
    onSelect:["#fdac00"],
  }

  themeOptions = this.themeService.availableThemes;
  themeModeOptions = this.themeService.themeModes;
  selectedThemeMode :"light" | "dark" | string = this.themeService.currentThemeMode;
  selectedTheme: ThemeModel;
  themeApplied = false;
  paletteColor = "#00aa00"
  colorPallets!:Color[];

  showAddTheme = false;
  showEditTheme = false;
  activeTheme:ThemeModel;

  constructor(
    private fb: FormBuilder,
    public themeService: DynamicThemeService,
    private appService: AppService,
    private tenantService:TenantService
  ) {
    this.dynamicThemeForm = this.fb.group(this.dynamicThemeFormConfig);
    
    // this.themeService.getThemeModeChangedSubject().subscribe((res: string) => {
    //   this.selectedThemeMode = res;
    // });
    
    this.themeService.getThemeChangedSubject().subscribe(res => {
      this.themeOptions = this.themeService.availableThemes;
      this.activeTheme = this.themeOptions.find(e => e.isActive);
      this.selectedTheme = this.activeTheme;
      this.themeService.setTheme(this.activeTheme || this.themeService.selectedTheme);
    });

    this.paletteChanged();
    this.getAllThemes();
    this.setDefaultTheme();
  }

  ngOnInit() { }

  setDefaultTheme() {
    this.selectedTheme = this.activeTheme = this.themeService.selectedTheme;
    this.closeOwnTheme();
  }

  setTheme() {
    if (this.selectedTheme.id !== "DYN_THM") {
      this.themeService.setTheme(this.selectedTheme);
      this.activeTheme = this.selectedTheme;
      // this.closeOwnTheme();
      this.autoPopulateOnEdit(this.activeTheme);
      // if(this.activeTheme.theme === "dynamic-theme" && this.showEditTheme) {
      // } else {
      //   this.showEditTheme = false;
      // }
    }
  }

  autoPopulateOnEdit(theme:ThemeModel){
    if(this.activeTheme.theme === "dynamic-theme" && this.showEditTheme) {
      this.dynamicThemeForm.patchValue(theme);
    } else {
      this.showEditTheme = false;
    }
  }

  onEditActiveTheme(){
    this.showAddTheme = false;
    this.showEditTheme = !this.showEditTheme;
    this.autoPopulateOnEdit(this.activeTheme);
  }

  onAddNewTheme(){
    this.showAddTheme = true;
    this.showEditTheme = false;
    this.dynamicThemeForm = null;
    this.dynamicThemeForm = this.fb.group(this.dynamicThemeFormConfig);
  }
  closeOwnTheme() {
    this.showEditTheme = false;
    this.showAddTheme = false;
  }

  toggleTheme() {
    this.themeService.toggleThemeMode();
  }

  useTheme() {
    if (this.dynamicThemeForm.invalid) {
      this.themeApplied = false;
      return false;
    }
    const dyTheme: ThemeModel = this.dynamicThemeForm.value;
    // this.themeService.savePrimaryColor(dyTheme.primary);
    // this.themeService.saveSecondaryColor(dyTheme.accent);
    // this.themeService.saveTertiaryColor(dyTheme.warn);

    // this.themeService.saveHoverColor(dyTheme.onHover);
    // this.themeService.saveSelectedBGColor(dyTheme.onSelect);
    this.themeService.setTheme(dyTheme);
    this.themeApplied = true;
  }

  saveTheme() {
    if (this.selectedTheme.theme === "dynamic-theme")
      var { label, primary = "", accent = "", warn = "", theme: themeName } = this.dynamicThemeForm.value;
    else
      var { label, primary, accent, warn, theme: themeName } = <any>this.selectedTheme;

    this.appService.saveTheme({  "primary":primary, "accent":accent, "warn":warn, label, themeName, clientId: "multi-tenant-id", toolBarBG: "", toolBarText: "", isActive: false }).subscribe(res => {
   
      this.themeApplied = false;
      this.showAddTheme = false;
      this.getAllThemes();
    }, (error) => {
     
    });
  }

  applyTheme(theme:ThemeModel) {
    this.appService.applyTheme({"themeId":theme.id}).subscribe(res => {
      // this.themeApplied = false;
      this.getAllThemes();
    }, (error) => {
      if (!error.message) return null;
    });
  }

  getAllThemes(){
    this.appService.getAllThemes().subscribe((res:any) => {
      const appTheme = res[this.tenantService.getTenant()];
      if(appTheme && Array.isArray(appTheme)) {
        appTheme.forEach(eachTheme => {
          eachTheme["id"] = eachTheme._id;
          eachTheme["theme"] = eachTheme.theme || eachTheme.themeName;
        });
        this.themeService.setAvailabeThemesAndNotify(<ThemeModel[]>appTheme);
      }
    }, (error) => {});
  }

  getSelectedThemes() {
    this.appService.getSelectedTheme().subscribe((res: any) => {
      if(res) {
        res["id"] = res._id;
        res["theme"] = res.theme || res.themeName;
        this.themeService.setAvailabeThemesAndNotify(<ThemeModel[]>[res]);
      }
    }, (error) => {});
  }

  primaryColorChanged(event) {
    this.dynamicThemeForm.get('onSelect').setValue(this.getSelectedColorFromPrimaryColor(event.target.value));
  }
  getSelectedColorFromPrimaryColor(pColor){
    if(pColor) {
      const colorPallets = this.themeService.computeColors(pColor);
      return colorPallets[9].hex;
    }
  }
  paletteChanged(){
    this.colorPallets = this.getPaletteColors(this.paletteColor);
  }
  getPaletteColors(colorCode){
    const colorNames = ["300", "400", "500", "600", "700", "800", "900", "A400", "A700"]
    return this.themeService.computeColors(colorCode).filter((colorItem, index) => colorNames.includes(colorItem.name));
  }
}
