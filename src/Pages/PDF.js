import React, { useEffect, useRef, useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "../Styles/PDFStyle.css";
import "../Styles/GeneralStyle.css";

import Logo from "../Media/logo.png";
import IconNoImage from "../Media/icons/ic-no-img.png";
import IconUpload from "../Media/icons/ic-upload.png";
import LoadingScreen from "../Components/LoadingScreen";
import Modal from "../Components/Modal";
import ToastMessage from "../Components/ToastMessage";

function PDF() {
  // son ödeme tarihi
  const [real_date_son_odeme, set_real_date_son_odeme] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [son_odeme_tarihi, set_son_odeme_tarihi] = useState("");

  // ilk okuma
  const [real_date_ilk_okuma, set_real_date_ilk_okuma] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [ilk_okuma_tarihi, set_ilk_okuma_tarihi] = useState("");

  // son okuma
  const [real_date_son_okuma, set_real_date_son_okuma] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [son_okuma_tarihi, set_son_okuma_tarihi] = useState("");

  const handleDateChange = (mdate, func, funcReal) => {
    funcReal(mdate);
    let splitted_date = mdate.split("-");
    let formatted_date =
      splitted_date[2] + "/" + splitted_date[1] + "/" + splitted_date[0];
    func(formatted_date);
  };

  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);

    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };
  function parseDate(str) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
  }

  useEffect(() => {
    handleDateChange(
      new Date().toLocaleDateString("en-CA"),
      set_son_odeme_tarihi,
      set_real_date_son_odeme
    );
    handleDateChange(
      new Date().toLocaleDateString("en-CA"),
      set_ilk_okuma_tarihi,
      set_real_date_ilk_okuma
    );
    handleDateChange(
      new Date().toLocaleDateString("en-CA"),
      set_son_okuma_tarihi,
      set_real_date_son_okuma
    );
  }, []);

  const etap_2_1A_toplam_net_m2 = useRef(0);
  const etap_2_1A_toplam_tuketim = useRef(0);
  const etap_2_1A_toplam_fatura = useRef(0);
  const etap_2_2A_toplam_net_m2 = useRef(0);
  const etap_2_2A_toplam_tuketim = useRef(0);
  const etap_2_2A_toplam_fatura = useRef(0);
  const etap_2_2B_toplam_net_m2 = useRef(0);
  const etap_2_2B_toplam_tuketim = useRef(0);
  const etap_2_2B_toplam_fatura = useRef(0);
  const etap_2_2C_toplam_net_m2 = useRef(0);
  const etap_2_2C_toplam_tuketim = useRef(0);
  const etap_2_2C_toplam_fatura = useRef(0);
  const etap_3_1A_toplam_net_m2 = useRef(0);
  const etap_3_1A_toplam_tuketim = useRef(0);
  const etap_3_1A_toplam_fatura = useRef(0);
  const etap_3_2A_toplam_net_m2 = useRef(0);
  const etap_3_2A_toplam_tuketim = useRef(0);
  const etap_3_2A_toplam_fatura = useRef(0);
  const etap_3_2B_toplam_net_m2 = useRef(0);
  const etap_3_2B_toplam_tuketim = useRef(0);
  const etap_3_2B_toplam_fatura = useRef(0);
  const etap_3_2C_toplam_net_m2 = useRef(0);
  const etap_3_2C_toplam_tuketim = useRef(0);
  const etap_3_2C_toplam_fatura = useRef(0);

  const ortak_site_m2 = useRef(0);
  const ortak_elektrik = useRef(0);
  const ortak_site_dogalgaz = useRef(0);

  const readExcel = (file) => {
    if (file) {
      set_uploading_file(true);
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          window.alert("ERROR: " + err);
        } else {
          const data = resp.rows;

          calculateAllData(data);
          downloadPdf(data);

          set_uploading_file(false);
          set_chosen_file_name(file.name);
          set_file_chosen(true);
        }
      });
    } else {
      set_uploading_file(false);
      set_file_chosen(false);
      set_chosen_file_name("Choose excel file");
    }
  };

  function calculateAllData(data) {
    etap_2_1A_toplam_net_m2.current = 0;
    etap_2_1A_toplam_tuketim.current = 0;
    etap_2_1A_toplam_fatura.current = 0;
    etap_2_2A_toplam_net_m2.current = 0;
    etap_2_2A_toplam_tuketim.current = 0;
    etap_2_2A_toplam_fatura.current = 0;
    etap_2_2B_toplam_net_m2.current = 0;
    etap_2_2B_toplam_tuketim.current = 0;
    etap_2_2B_toplam_fatura.current = 0;
    etap_2_2C_toplam_net_m2.current = 0;
    etap_2_2C_toplam_tuketim.current = 0;
    etap_2_2C_toplam_fatura.current = 0;
    etap_3_1A_toplam_net_m2.current = 0;
    etap_3_1A_toplam_tuketim.current = 0;
    etap_3_1A_toplam_fatura.current = 0;
    etap_3_2A_toplam_net_m2.current = 0;
    etap_3_2A_toplam_tuketim.current = 0;
    etap_3_2A_toplam_fatura.current = 0;
    etap_3_2B_toplam_net_m2.current = 0;
    etap_3_2B_toplam_tuketim.current = 0;
    etap_3_2B_toplam_fatura.current = 0;
    etap_3_2C_toplam_net_m2.current = 0;
    etap_3_2C_toplam_tuketim.current = 0;
    etap_3_2C_toplam_fatura.current = 0;
    for (let i = 1; i < data.length - 2; i++) {
      if (data[i][0]) {
        if (data[i][0] == "2.Etap 1A") {
          etap_2_1A_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_2_1A_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_2_1A_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "2.Etap 2A") {
          etap_2_2A_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_2_2A_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_2_2A_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "2.Etap 2B") {
          etap_2_2B_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_2_2B_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_2_2B_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "2.Etap 2C") {
          etap_2_2C_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_2_2C_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_2_2C_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "3.Etap 1A") {
          etap_3_1A_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_3_1A_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_3_1A_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "3.Etap 2A") {
          etap_3_2A_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_3_2A_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_3_2A_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "3.Etap 2B") {
          etap_3_2B_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_3_2B_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_3_2B_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }
        if (data[i][0] == "3.Etap 2C") {
          etap_3_2C_toplam_net_m2.current += parseFloat(data[i][4]);
          etap_3_2C_toplam_tuketim.current += parseFloat(data[i][9]);
          etap_3_2C_toplam_fatura.current += parseFloat(data[i][13]) - 8;
        }

        if (data[i][5]) {
          ortak_site_m2.current += parseFloat(data[i][5]);
        }
        if (data[i][15]) {
          ortak_elektrik.current += parseFloat(data[i][15]);
        }
        if (data[i][14]) {
          ortak_site_dogalgaz.current += parseFloat(data[i][14]);
        }
      }
    }
    console.log("2-1A net m2: " + etap_2_1A_toplam_net_m2.current);
    console.log("2-1A tuketim: " + etap_2_1A_toplam_tuketim.current);
    console.log("2-1A fatura: " + etap_2_1A_toplam_fatura.current);
    console.log("2-2A net m2: " + etap_2_2A_toplam_net_m2.current);
    console.log("2-2A tuketim: " + etap_2_2A_toplam_tuketim.current);
    console.log("2-2A fatura: " + etap_2_2A_toplam_fatura.current);
    console.log("2-2B net m2: " + etap_2_2B_toplam_net_m2.current);
    console.log("2-2B tuketim: " + etap_2_2B_toplam_tuketim.current);
    console.log("2-2B fatura: " + etap_2_2B_toplam_fatura.current);
    console.log("2-2C net m2: " + etap_2_2C_toplam_net_m2.current);
    console.log("2-2C tuketim: " + etap_2_2C_toplam_tuketim.current);
    console.log("2-2C fatura: " + etap_2_2C_toplam_fatura.current);
    console.log("3-1A net m2: " + etap_3_1A_toplam_net_m2.current);
    console.log("3-1A tuketim: " + etap_3_1A_toplam_tuketim.current);
    console.log("3-1A fatura: " + etap_3_1A_toplam_fatura.current);
    console.log("3-2A net m2: " + etap_3_2A_toplam_net_m2.current);
    console.log("3-2A tuketim: " + etap_3_2A_toplam_tuketim.current);
    console.log("3-2A fatura: " + etap_3_2A_toplam_fatura.current);
    console.log("3-2B net m2: " + etap_3_2B_toplam_net_m2.current);
    console.log("3-2B tuketim: " + etap_3_2B_toplam_tuketim.current);
    console.log("3-2B fatura: " + etap_3_2B_toplam_fatura.current);
    console.log("3-2C net m2: " + etap_3_2C_toplam_net_m2.current);
    console.log("3-2C tuketim: " + etap_3_2C_toplam_tuketim.current);
    console.log("3-2C fatura: " + etap_3_2C_toplam_fatura.current);
  }

  /** TEXT ALIGN **/
  var splitRegex = /\r\n|\r|\n/g;
  jsPDF.API.textEx = function (text, x, y, hAlign, vAlign) {
    var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

    // As defined in jsPDF source code
    var lineHeightProportion = 1.15;

    var splittedText = null;
    var lineCount = 1;
    if (
      vAlign === "middle" ||
      vAlign === "bottom" ||
      hAlign === "center" ||
      hAlign === "right"
    ) {
      splittedText = typeof text === "string" ? text.split(splitRegex) : text;

      lineCount = splittedText.length || 1;
    }

    // Align the top
    y += fontSize * (2 - lineHeightProportion);

    if (vAlign === "middle") y -= (lineCount / 2) * fontSize;
    else if (vAlign === "bottom") y -= lineCount * fontSize;

    if (hAlign === "center" || hAlign === "right") {
      var alignSize = fontSize;
      if (hAlign === "center") alignSize *= 0.5;

      if (lineCount > 1) {
        for (var iLine = 0; iLine < splittedText.length; iLine++) {
          this.text(
            splittedText[iLine],
            x - this.getStringUnitWidth(splittedText[iLine]) * alignSize,
            y
          );
          y += fontSize * lineHeightProportion;
        }
        return this;
      }
      x -= this.getStringUnitWidth(text) * alignSize;
    }

    this.text(text, x, y);
    return this;
  };
  function downloadPdf(data) {
    var doc = new jsPDF("p", "mm", [148, 210]);

    var left_corner = 8;
    var right_corner = 140;
    var big_font_size = 10;
    var medium_font_size = 8;
    var small_font_size = 5;
    var line_height_big = 7;
    var line_height_medium = 5;
    var line_height_small = 3;

    for (let i = 1; i < data.length - 2; i++) {
      if (data[i][0]) {
        // SET DATA
        let current_data = getData(data, i);

        // HOME
        var etap = current_data.etap;
        var blok = current_data.blok;
        var daire = current_data.daire;

        // 30%
        var yuzde_otuz_blok_m2 = current_data.yuzde_otuz_blok_m2;
        var yuzde_otuz_daire_m2 = current_data.yuzde_otuz_daire_m2;
        var yuzde_otuz_birim_fiyat = current_data.yuzde_otuz_birim_fiyat;
        var yuzde_otuz_tutar = current_data.yuzde_otuz_tutar;

        // 70%
        var yuzde_yetmis_ilk_veri = current_data.yuzde_yetmis_ilk_veri;
        var yuzde_yetmis_son_veri = current_data.yuzde_yetmis_son_veri;
        var yuzde_yetmis_tuketim = current_data.yuzde_yetmis_tuketim;
        var yuzde_yetmis_birim_fiyat = current_data.yuzde_yetmis_birim_fiyat;
        var yuzde_yetmis_tutar = current_data.yuzde_yetmis_tutar;

        var blok_fatura = current_data.blok_fatura;

        // START CREATING PDF
        if (i >= 2) {
          doc.addPage();
        }
        doc.setPage(i);
        var start_point = 10;
        var current_point = start_point;
        var temp_point = 0;

        // Logo
        doc.addImage(Logo, "PNG", left_corner, start_point - 3, 20, 15);

        /*****************************/
        doc.setFont(undefined, "bold");
        doc.setFontSize(big_font_size);
        doc.textEx(
          "AVRUPA KONUTLARI BASAKSEHIR 2 SITE YONETIMI",
          right_corner,
          current_point,
          "right"
        );
        current_point += line_height_medium;
        doc.setFontSize(small_font_size);
        doc.textEx(
          "MERKEZI ISINMA / SICAK SU, ORTAK ALAN ELEKTRIK",
          right_corner,
          current_point,
          "right"
        );
        current_point += line_height_small;
        doc.textEx(
          "VE SOSYAL TESIS DOGALGAZ GIDERI PAYLASIMI BILGILENDIRME FORMU",
          right_corner,
          current_point,
          "right"
        );

        // keep this point
        current_point += line_height_big;
        temp_point = current_point;

        /*****************************/
        // EV TEMEL BILGILER
        doc.setFontSize(medium_font_size);
        doc.textEx("ETAP:", left_corner + 15, current_point, "right");
        doc.setFont(undefined, "normal");
        doc.textEx(etap, left_corner + 20, current_point);
        current_point += line_height_medium;
        doc.setFont(undefined, "bold");
        doc.textEx("BLOK:", left_corner + 15, current_point, "right");
        doc.setFont(undefined, "normal");
        doc.textEx(blok, left_corner + 20, current_point);
        current_point += line_height_medium;
        doc.setFont(undefined, "bold");
        doc.textEx("DAIRE:", left_corner + 15, current_point, "right");
        doc.setFont(undefined, "normal");
        doc.textEx(daire, left_corner + 20, current_point);
        current_point += (3 / 2) * line_height_big;
        doc.setFont(undefined, "bold");
        doc.textEx(
          "SON ODEME TARIHI",
          left_corner + 40,
          current_point,
          "right"
        );
        current_point += (3 / 2) * line_height_small;
        doc.textEx(son_odeme_tarihi, left_corner + 35, current_point, "right");
        /*****************************/
        // GIDERLER OZET
        current_point = temp_point; // get point
        doc.setFont(undefined, "normal");

        doc.textEx("ORTAK GIDER:", right_corner - 35, current_point, "right");
        doc.textEx(
          yuzde_otuz_tutar.toFixed(2).replace(".", ",") + " TL",
          right_corner - 30,
          current_point
        );
        current_point += line_height_medium;
        doc.textEx(
          "ISINMA / SICAK SU:",
          right_corner - 35,
          current_point,
          "right"
        );
        doc.textEx(
          yuzde_yetmis_tutar.toFixed(2).replace(".", ",") + " TL",
          right_corner - 30,
          current_point
        );

        current_point += line_height_medium;
        doc.textEx(
          "ORTAK ALAN ELEKTRIK:",
          right_corner - 35,
          current_point,
          "right"
        );
        console.log(ortak_elektrik.current);
        doc.textEx(
          (
            (parseFloat(data[i][5]) * parseFloat(ortak_elektrik.current)) /
            parseFloat(ortak_site_m2.current)
          )
            .toFixed(2)
            .replace(".", ",") + " TL",
          right_corner - 30,
          current_point
        );
        current_point += line_height_medium;
        doc.textEx(
          "SOSYAL TESIS DOGALGAZ:",
          right_corner - 35,
          current_point,
          "right"
        );
        doc.textEx(
          (
            (parseFloat(data[i][5]) * parseFloat(ortak_site_dogalgaz.current)) /
            parseFloat(ortak_site_m2.current)
          )
            .toFixed(2)
            .replace(".", ",") + " TL",
          right_corner - 30,
          current_point
        );

        current_point += line_height_medium;
        doc.textEx(
          "SISTEM BAKIM BEDELI:",
          right_corner - 35,
          current_point,
          "right"
        );
        doc.textEx("8 TL", right_corner - 30, current_point);
        doc.setFont(undefined, "bold");
        current_point += line_height_medium;
        doc.textEx("TOPLAM TUTAR:", right_corner - 35, current_point, "right");
        doc.textEx(
          (
            yuzde_otuz_tutar +
            yuzde_yetmis_tutar +
            (parseFloat(data[i][5]) * parseFloat(ortak_elektrik.current)) /
              parseFloat(ortak_site_m2.current) +
            (parseFloat(data[i][5]) * parseFloat(ortak_site_dogalgaz.current)) /
              parseFloat(ortak_site_m2.current) +
            8
          )
            .toFixed(2)
            .replace(".", ",") + " TL",
          right_corner - 30,
          current_point
        );
        /*****************************/
        // TABLOLAR
        /* TABLE 30% */
        current_point += line_height_big;
        tableGenerator(
          doc,
          current_point,
          [
            {
              content:
                "ISINMA VE SICAK SU ORTAK GIDER PAYI (TOPLAM FATURANIN %30'U)",
              colSpan: 4,
            },
          ],
          ["BLOK TOPLAM M²", "DAIRE NET M²", "BIRIM FIYAT", "TUTAR"],
          [
            yuzde_otuz_blok_m2.toFixed(2).replace(".", ","),
            yuzde_otuz_daire_m2.toFixed(2).replace(".", ","),
            yuzde_otuz_birim_fiyat.toFixed(3).replace(".", ","),
            yuzde_otuz_tutar.toFixed(2).replace(".", ","),
          ]
        );

        /* TABLE 70% */
        current_point += 4 * line_height_big;
        tableGenerator(
          doc,
          current_point,
          [
            {
              content:
                "ISINMA SICAK SU KULLANIM DETAYI (TOPLAM FATURANIN %70'I)",
              colSpan: 5,
            },
          ], // head
          ["ILK ENDEKS", "SON ENDEKS", "TUKETIM", "BIRIM FIYAT", "TUTAR"], // body head
          // body data
          [
            yuzde_yetmis_ilk_veri.toFixed(2).replace(".", ","),
            yuzde_yetmis_son_veri.toFixed(2).replace(".", ","),
            yuzde_yetmis_tuketim.toFixed(2).replace(".", ","),
            yuzde_yetmis_birim_fiyat.toFixed(3).replace(".", ","),
            yuzde_yetmis_tutar.toFixed(2).replace(".", ","),
          ]
        );

        /* TABLE ELEKTRIK */
        current_point += 4 * line_height_big;
        tableGenerator(
          doc,
          current_point,
          [
            {
              content: "ORTAK ALAN ELEKTRIK BEDELI",
              colSpan: 5,
            },
          ],
          [
            "SITE TOPLAM M²",
            "FATURA BEDELI",
            "DAIRE BRUT M²",
            "BIRIM FIYAT",
            "TUTAR",
          ],
          [
            parseFloat(ortak_site_m2.current).toFixed(2).replace(".", ","),
            parseFloat(ortak_elektrik.current).toFixed(2).replace(".", ","),
            data[i][5].toFixed(2).replace(".", ","),
            (
              parseFloat(ortak_elektrik.current) /
              parseFloat(ortak_site_m2.current)
            )
              .toFixed(2)
              .replace(".", ","),
            (
              (parseFloat(data[i][5]) * parseFloat(ortak_elektrik.current)) /
              parseFloat(ortak_site_m2.current)
            )
              .toFixed(2)
              .replace(".", ","),
          ]
        );

        /* TABLE DOGALGAZ */
        current_point += 4 * line_height_big;
        tableGenerator(
          doc,
          current_point,
          [
            {
              content: "SOSYAL TESIS DOGALGAZ TUKETIM BEDELI PAYLASIMI",
              colSpan: 5,
            },
          ],
          [
            "SITE TOPLAM M²",
            "FATURA BEDELI",
            "DAIRE BRUT M²",
            "BIRIM FIYAT",
            "TUTAR",
          ],
          [
            parseFloat(ortak_site_m2.current).toFixed(2).replace(".", ","),
            parseFloat(ortak_site_dogalgaz.current)
              .toFixed(2)
              .replace(".", ","),
            data[i][5],
            (
              parseFloat(ortak_site_dogalgaz.current) /
              parseFloat(ortak_site_m2.current)
            )
              .toFixed(2)
              .replace(".", ","),
            (
              (parseFloat(data[i][5]) *
                parseFloat(ortak_site_dogalgaz.current)) /
              parseFloat(ortak_site_m2.current)
            )
              .toFixed(2)
              .replace(".", ","),
          ]
        );

        /* TABLE DOGALGAZ BLOK */
        current_point += 4 * line_height_big;
        tableGenerator(
          doc,
          current_point,
          [
            {
              content: "BLOGUNUZA GELEN DOGALGAZ FATURASI",
              colSpan: 4,
            },
          ],
          ["ILK OKUMA", "SON OKUMA", "GUN SAYISI", "PAY EDILEN TUTAR"],
          [
            ilk_okuma_tarihi,
            son_okuma_tarihi,
            date_diff_indays(
              parseDate(ilk_okuma_tarihi),
              parseDate(son_okuma_tarihi)
            ),
            blok_fatura,
          ]
        );
      }
    }

    // save
    window.open(doc.output("bloburl"), "_blank");
  }

  function tableGenerator(doc, current_point, head, body_head, body_data) {
    doc.autoTable({
      theme: "grid",
      tableWidth: 139,
      startY: current_point,
      headStyles: { fillColor: [20, 58, 133] },
      margin: { top: 10, left: 5, rigth: 5 },
      head: [head],
      body: [body_head, body_data],
    });
  }
  function getData(data, i) {
    var etap = "";
    var blok = "";
    var daire = "";

    // 30%
    var yuzde_otuz_blok_m2 = 0;
    var yuzde_otuz_daire_m2 = 0;
    var yuzde_otuz_birim_fiyat = 0;
    var yuzde_otuz_tutar = 0;

    // 70%
    var yuzde_yetmis_ilk_veri = 0;
    var yuzde_yetmis_son_veri = 0;
    var yuzde_yetmis_tuketim = 0;
    var yuzde_yetmis_birim_fiyat = 0;
    var yuzde_yetmis_tutar = 0;

    var blok_fatura = 0;

    if (data[i][0] == "2.Etap 1A") {
      etap = "2. Etap";
      blok = "1A";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_2_1A_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_2_1A_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_2_1A_toplam_fatura.current * 7) /
        10 /
        etap_2_1A_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[0].fatura;
    }
    if (data[i][0] == "2.Etap 2A") {
      etap = "2. Etap";
      blok = "2A";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_2_2A_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_2_2A_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_2_2A_toplam_fatura.current * 7) /
        10 /
        etap_2_2A_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[1].fatura;
    }
    if (data[i][0] == "2.Etap 2B") {
      etap = "2. Etap";
      blok = "2B";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_2_2B_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_2_2B_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_2_2B_toplam_fatura.current * 7) /
        10 /
        etap_2_2B_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[2].fatura;
    }
    if (data[i][0] == "2.Etap 2C") {
      etap = "2. Etap";
      blok = "2C";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_2_2C_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_2_2C_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_2_2C_toplam_fatura.current * 7) /
        10 /
        etap_2_2C_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[3].fatura;
    }
    if (data[i][0] == "3.Etap 1A") {
      etap = "3. Etap";
      blok = "1A";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_3_1A_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_3_1A_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_3_1A_toplam_fatura.current * 7) /
        10 /
        etap_3_1A_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[4].fatura;
    }
    if (data[i][0] == "3.Etap 2A") {
      etap = "3. Etap";
      blok = "2A";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_3_2A_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_3_2A_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_3_2A_toplam_fatura.current * 7) /
        10 /
        etap_3_2A_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[5].fatura;
    }
    if (data[i][0] == "3.Etap 2B") {
      etap = "3. Etap";
      blok = "2B";
      daire = data[i][2];
      // 30%
      yuzde_otuz_blok_m2 = etap_3_2B_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_3_2B_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;

      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_3_2B_toplam_fatura.current * 7) /
        10 /
        etap_3_2B_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[6].fatura;
    }
    if (data[i][0] == "3.Etap 2C") {
      etap = "3. Etap";
      blok = "2C";
      daire = data[i][2];

      // 30%
      yuzde_otuz_blok_m2 = etap_3_2C_toplam_net_m2.current;
      yuzde_otuz_daire_m2 = data[i][4];
      yuzde_otuz_birim_fiyat =
        (etap_3_2C_toplam_fatura.current * 3) / 10 / yuzde_otuz_blok_m2;
      yuzde_otuz_tutar = yuzde_otuz_birim_fiyat * yuzde_otuz_daire_m2;
      // 70%
      yuzde_yetmis_ilk_veri = parseFloat(data[i][7]);
      yuzde_yetmis_son_veri = parseFloat(data[i][8]);
      yuzde_yetmis_tuketim = parseFloat(data[i][9]);
      yuzde_yetmis_birim_fiyat =
        (etap_3_2C_toplam_fatura.current * 7) /
        10 /
        etap_3_2C_toplam_tuketim.current;
      yuzde_yetmis_tutar = yuzde_yetmis_birim_fiyat * yuzde_yetmis_tuketim;
      blok_fatura = bloklar[7].fatura;
    }

    return {
      etap: etap,
      blok: blok,
      daire: daire,

      yuzde_otuz_blok_m2: yuzde_otuz_blok_m2,
      yuzde_otuz_daire_m2: yuzde_otuz_daire_m2,
      yuzde_otuz_birim_fiyat: yuzde_otuz_birim_fiyat,
      yuzde_otuz_tutar: yuzde_otuz_tutar,

      yuzde_yetmis_ilk_veri: yuzde_yetmis_ilk_veri,
      yuzde_yetmis_son_veri: yuzde_yetmis_son_veri,
      yuzde_yetmis_tuketim: yuzde_yetmis_tuketim,
      yuzde_yetmis_birim_fiyat: yuzde_yetmis_birim_fiyat,
      yuzde_yetmis_tutar: yuzde_yetmis_tutar,

      blok_fatura: blok_fatura,
    };
  }

  // front end styling
  const [uploading_file, set_uploading_file] = useState(false);
  const [file_chosen, set_file_chosen] = useState(false);
  const [chosen_file_name, set_chosen_file_name] = useState(
    "Excel Dosyanızı Seçmek İçin Tıklayınız"
  );

  // Modal
  const [bloklar, set_bloklar] = useState([
    { blok: "2.Etap 1A", fatura: 0 },
    { blok: "2.Etap 2A", fatura: 0 },
    { blok: "2.Etap 2B", fatura: 0 },
    { blok: "2.Etap 2C", fatura: 0 },
    { blok: "3.Etap 1A", fatura: 0 },
    { blok: "3.Etap 2A", fatura: 0 },
    { blok: "3.Etap 2B", fatura: 0 },
    { blok: "3.Etap 2C", fatura: 0 },
  ]);
  const [open_modal] = useState(true);

  function setBlokBill(index, bill) {
    let temp = [...bloklar];
    temp[index].fatura = bill;
    set_bloklar(temp);

    let message = [];
    for (let i = 0; i < temp.length; i++) {
      message[i] = temp[i].blok + ": " + temp[i].fatura;
    }
    set_toast_message(message);
  }

  // Toast Message
  const [showToastMessage, setShowToastMessage] = useState(true);
  const [toast_message, set_toast_message] = useState(["..."]);

  return (
    <div className="container">
      {uploading_file && (
        <LoadingScreen
          message={"PDF dosyanızı hazırlıyoruz. Lütfen bekleyin..."}
        />
      )}
      {open_modal && <Modal options={bloklar} setBlokBill={setBlokBill} />}
      <div className="drop-files-container">
        <div className="info">
          <h4>DİKKAT!</h4>
          <p>Son ödeme tarihinin doğruluğundan emin olunuz!</p>
          <p>
            Seçtiğiniz excel dosyasının formata uygun olduğundan emin olunuz!
          </p>
          <p>
            Şayet bir excel dosyası seçtiyseniz tekrar PDF çıktısı almak için
            sayfayı yenileyiniz.
          </p>
          <p>
            PDF indirmeleri gerçekleşmiyorsa sayfadaki pop up'lara izin
            veriğinizden emin olun!
          </p>
          <p>
            PDF indirme sorunları devam ediyorsa yetkililerle iletişime geçiniz.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-8">
            <button
              type="button"
              className="btn btn-primary border-radius"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Blok Doğalgaz Faturalarını Ayarla
            </button>
            <button
              type="button"
              className="btn btn-secondary margin-left-5 border-radius"
              onClick={() => setShowToastMessage(true)}
            >
              Fatura Bilgilerini Göster
            </button>
          </div>
          <div className="col-lg-4">
            <span className="margin-top-10">Doğalgaz Sayaç İlk Okuma</span>
          </div>
          <div className="col-lg-8">
            <input
              type={"date"}
              className={"custom-date-picker margin-top-10"}
              value={real_date_ilk_okuma}
              onChange={(e) =>
                handleDateChange(
                  e.target.value,
                  set_ilk_okuma_tarihi,
                  set_real_date_ilk_okuma
                )
              }
            />
          </div>
          <div className="col-lg-4">
            <span className="margin-top-10">Doğalgaz Sayaç Son Okuma</span>
          </div>
          <div className="col-lg-8">
            <input
              type={"date"}
              className={"custom-date-picker margin-top-10"}
              value={real_date_son_okuma}
              onChange={(e) =>
                handleDateChange(
                  e.target.value,
                  set_son_okuma_tarihi,
                  set_real_date_son_okuma
                )
              }
            />
          </div>
          <div className="col-lg-4">
            <span className="margin-top-10">Son Ödeme Tarihi</span>
          </div>
          <div className="col-lg-8">
            <input
              type={"date"}
              className={"custom-date-picker margin-top-10"}
              value={real_date_son_odeme}
              onChange={(e) =>
                handleDateChange(
                  e.target.value,
                  set_son_odeme_tarihi,
                  set_real_date_son_odeme
                )
              }
            />
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-8">
            <label
              htmlFor="excel-upload"
              id="excel-upload-btn"
              className={file_chosen ? "chosen margin-top-10" : "margin-top-10"}
            >
              <img src={IconUpload} alt={IconNoImage} />
              <span>{chosen_file_name}</span>
            </label>
            <input
              type={"file"}
              name={"excel-upload"}
              id={"excel-upload"}
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
          </div>
        </div>
      </div>

      {showToastMessage && (
        <ToastMessage
          title={"Blok Fatura Bilgileri"}
          message={toast_message}
          closeToast={setShowToastMessage}
        />
      )}
    </div>
  );
}

export default PDF;
