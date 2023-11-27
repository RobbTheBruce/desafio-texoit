import { NgModule } from "@angular/core";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MoviesRoutingModule } from "./movies.routes";
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MoviesComponent } from "./movies.component";
import { HeaderBarComponent } from "./components/header-bar/header-bar.component";
import { LeftBarComponent } from "./components/left-bar/left-bar.component";
import { ListComponent } from "./pages/list/list.component";
import { SharedModule } from "../../shared/shared.module";
import { MovieService } from "./services/movies.service";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MoviesComponent,
        HeaderBarComponent,
        LeftBarComponent,
        DashboardComponent,
        ListComponent
    ],
    imports: [
        CommonModule, 
        RouterOutlet,
        RouterModule,
        RouterLink, 
        RouterLinkActive,
        FormsModule,
        HttpClientModule,
        MoviesRoutingModule,
        SharedModule
    ],
    providers: [
        MovieService
    ]
})
export class MoviesModule {}