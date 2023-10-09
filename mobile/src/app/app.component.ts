import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import * as paper from 'paper'
import {HeartTree} from "./shape/heart";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
    @ViewChild('canvas') canvas: ElementRef | undefined;

    private layer: paper.Layer | undefined ;
    private center = { x: 0  , y: 0 }
    ngAfterViewInit(): void {
        paper.setup(this.canvas?.nativeElement)
        this.layer = new paper.Layer()
        paper.project.addLayer(this.layer)
        const { clientWidth , clientHeight } = document.body ;
        this.center.x = Math.ceil(clientWidth / 2 )
        this.center.y = Math.ceil(clientHeight / 2)
        const h = new HeartTree({...this.center , layer: this.layer})
    }
}
