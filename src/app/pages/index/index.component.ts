import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PdfViewerComponent } from 'lib/ng2-pdf-viewer/public_api';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  pdfSrc = 'assets/sample.pdf';
  currentPage = 1;
  totalPages = 1;
  @ViewChild(PdfViewerComponent, { static: true })
  pdfViewer?: PdfViewerComponent;
  currentAnnotations: any = [];
  annotations: any = [
    {
      page: 1,
      id: 21,
      text: 'this is a test',
      position: {
        x: 100,
        y: 100,
      },
      style: {},
    },
    {
      page: 2,
      id: 22,
      text: 'this is another test',
      position: {
        x: 100,
        y: 200,
      },
      style: {},
    },
    {
      page: 2,
      id: 34,
      text: 'This is element 34',
      position: {
        x: 100,
        y: 800,
      },
      style: {},
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.pdfViewer?.pageInitialized.subscribe(() => {
      this.totalPages = this.pdfViewer?.pdfViewer.pagesCount ?? 1;
      this.updateAnnotations();
    });
    this.pdfViewer?.pageChange.subscribe(() => {
      this.updateAnnotations();
    });
  }

  nextPage() {
    this.currentPage += 1;
  }

  prevPage() {
    this.currentPage -= 1;
  }

  updateAnnotations() {
    this.currentAnnotations = this.annotations
      .filter((annotation: any) => annotation.page === this.currentPage)
      .map((item: any) => {
        item.style.left = `${item.position.x}px`;
        item.style.top = `${item.position.y}px`;
        return item;
      });
  }

  savePositionState(item: any, event: CdkDragEnd) {
    const itemIndex = this.annotations.findIndex(
      (annotation: any) => annotation.id === item.id
    );
    item = { ...item };
    console.log(item.position);
    item.position.x += event.distance.x;
    item.position.y += event.distance.y;

    this.annotations[itemIndex] = item;
  }
}
