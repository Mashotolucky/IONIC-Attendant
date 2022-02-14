import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;

  qrScan: any;


  constructor(private barcodeScanner: BarcodeScanner, public qr: QRScanner, public dialog: Dialogs, public platform: Platform) { 

    //Now Disable scanning when back button is pressed
    this.platform.backButton.subscribeWithPriority(0, () =>{
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    })
  }

  ngOnInit() {
  }

  scan(){
    this.qr.prepare().then((status: QRScannerStatus) =>{
      if(status.authorized){
        this.qr.show();

        document.getElementsByTagName("body")[0].style.opacity = "0";

        this.qrScan = this.qr.scan()
        .subscribe((textFound) =>{

          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.qr.enableLight();
          this.qr.useBackCamera();

          console.log("Found "+ textFound);
          this.dialog.alert(JSON.stringify(textFound));
          

        },(err)=>{
          console.log("Error "+ err);
          this.dialog.alert(JSON.stringify(err));
          
        })
      }
      else if( status.denied){

      }
      else{

      }
    })
  }


}
