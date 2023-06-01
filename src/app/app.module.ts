import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularSplitModule } from 'angular-split';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';

import { ModalModule } from 'ngx-bootstrap/modal';


import { jsPlumbToolkitModule } from 'jsplumbtoolkit-angular';
import { jsPlumbToolkitDragDropModule } from 'jsplumbtoolkit-angular-drop';

import { LoaderSpinnerService } from './services/loader-spinner.service';
import { ResizeService } from './services/resize.service';

import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { TabletComponent } from './tablet/tablet.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';



import { HeaderMainNavComponent } from './header/header-main-nav/header-main-nav.component';
import { HeaderPopupComponent } from './header/header-popup/header-popup.component';
import { LoginComponent } from './login/login.component';
import { BuildComponent } from './build/build.component';
import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './activate/activate.component';
import { DocumentTrackingComponent } from './document-tracking/document-tracking.component';
import { SettingsComponent } from './settings/settings.component';
import { VideoSwiperComponent } from './video-swiper/video-swiper.component';
import { RecentlyOpenedComponent } from './recently-opened/recently-opened.component';
import { HelpComponent } from './help/help.component';
import { ActivitiesIntroComponent } from './activities-intro/activities-intro.component';
import { ComponentTreeComponent } from './component-tree/component-tree.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor, ErrorInterceptor } from './helpers/index';



import { ActivateTreeComponent } from './activate-tree/activate-tree.component';
import { RecipeReportingComponent } from './recipe-reporting/recipe-reporting.component';

import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { BillingComponent } from './billing/billing.component';
import { MailAlertComponent } from './mail-alert/mail-alert.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';


import { NewComponentComponent } from './new-component/new-component.component';
import { ModalComponent } from './modal/modal.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';


// for recipe
import { RecipeComponent } from './recipe/recipe.component';
import { ProcessLogsComponent } from './process-logs/process-logs.component';
import { DetailProcessLogsComponent } from './process-logs/detail-process-logs/detail-process-logs.component';
import { WorkflowToolboxComponent } from './workflow-toolbox/workflow-toolbox.component';
import { WorkflowToolboxItemFilterPipe } from './pipes/workflow-toolbox-item-filter.pipe';
import { WorkflowCanvasComponent } from './workflow-canvas/workflow-canvas.component';
import { WorkflowNodesComponent } from './workflow-nodes/workflow-nodes.component';
import { ActivityConfigurationComponent } from './activity-configuration/activity-configuration.component';
import { JsplumbControlsComponent } from './jsplumb-controls/jsplumb-controls.component';
import { StartNodeComponent } from './workflow-nodes/start-node/start-node.component';
import { EndNodeComponent } from './workflow-nodes/end-node/end-node.component';
import { CleanseNodeComponent } from './workflow-nodes/cleanse-node/cleanse-node.component';
import { DiskNodeComponent } from './workflow-nodes/disk-node/disk-node.component';
import { SoapNodeComponent } from './workflow-nodes/soap-node/soap-node.component';
import { HttpClientNodeComponent } from './workflow-nodes/http-client-node/http-client-node.component';
import { MapNodeComponent } from './workflow-nodes/map-node/map-node.component';
import { CipNodeComponent } from './workflow-nodes/cip-node/cip-node.component';
import { NotifyNodeComponent } from './workflow-nodes/notify-node/notify-node.component';
import { DataProcessorNodeComponent } from './workflow-nodes/data-processor-node/data-processor-node.component';

// activity configuration
import { SoapServiceConfigurationComponent } from './activity-configuration/soap-service-configuration/soap-service-configuration.component';
import { HttpClientConfigurationComponent } from './activity-configuration/http-client-configuration/http-client-configuration.component';
import { DiskConfigurationComponent } from './activity-configuration/disk-configuration/disk-configuration.component';
import { SoapHeadersComponent } from './activity-configuration/soap-service-configuration/soap-headers/soap-headers.component';
import { SoapParametersComponent } from './activity-configuration/soap-service-configuration/soap-parameters/soap-parameters.component';
import { CipConfigurationComponent } from './activity-configuration/cip-configuration/cip-configuration.component';
import { NotifyConfigurationComponent } from './activity-configuration/notify-configuration/notify-configuration.component';
import { EndConfigurationComponent } from './activity-configuration/end-configuration/end-configuration.component';
import { StartConfigurationComponent } from './activity-configuration/start-configuration/start-configuration.component';
import { CleanseConfigurationComponent } from './activity-configuration/cleanse-configuration/cleanse-configuration.component';
import { MapConfigurationComponent } from './activity-configuration/map-configuration/map-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    HeaderComponent,
    TabletComponent,
    LayoutComponent,
    HeaderMainNavComponent,
    HeaderPopupComponent,
    LoginComponent,
    BuildComponent,
    HomeComponent,
    ActivateComponent,
    DocumentTrackingComponent,
    SettingsComponent,
    BillingComponent,
    VideoSwiperComponent,
    RecentlyOpenedComponent,
    HelpComponent,
    ActivitiesIntroComponent,
    ComponentTreeComponent,
    ChangePasswordComponent,
    ActivateTreeComponent,
    RecipeReportingComponent,
    SettingsMenuComponent,
    NewComponentComponent,
    ModalComponent,
    WorkflowToolboxComponent,
    WorkflowToolboxItemFilterPipe,
    RecipeComponent,
    LoaderSpinnerComponent,
    ProcessLogsComponent,
    DetailProcessLogsComponent,
    WorkflowCanvasComponent,
    WorkflowNodesComponent,
    JsplumbControlsComponent,
    ActivityConfigurationComponent,
    StartNodeComponent,
    EndNodeComponent,
    CleanseNodeComponent,
    DiskNodeComponent,
    SoapNodeComponent,
    HttpClientNodeComponent,
    MapNodeComponent,
    CipNodeComponent,
    DataProcessorNodeComponent,
    NotifyNodeComponent,   
    MailAlertComponent,
    CompanyProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgBootstrapFormValidationModule.forRoot(),
    AngularSplitModule.forRoot(),
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ModalModule.forRoot(),
    jsPlumbToolkitModule,
    jsPlumbToolkitDragDropModule,
  ],

  providers: [
    LoaderSpinnerService,
    ResizeService,        
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     // provider used to create fake backend
     fakeBackendProvider
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
