import { Component } from '@angular/core';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular File Upload POC';
  // https://stackoverflow.com/questions/45138466/angular-4-upload-csv

  private static extractData = function(csvData) { // Input csv data to the function

    const allTextLines = csvData.split(/\r\n|\n/);
    const headers = allTextLines[0].split(',');
    const lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        const dataRow = allTextLines[i].split(',');
        if (dataRow.length === headers.length) {
            const tmpArr = [];
            for ( let j = 0; j < headers.length; j++) {
              tmpArr.push(dataRow[j]);
            }
            lines.push(tmpArr);
        }
    }
    console.log(lines); // The data in the form of 2 dimensional array.
  };

  private handleFileSelect(fileSelectEvent) {

    const fileList = fileSelectEvent.target.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(fre: FileReaderEvent) {
      const csv = fre.target.result;
      console.log(csv);
      AppComponent.extractData(csv);
    };

  }

}
