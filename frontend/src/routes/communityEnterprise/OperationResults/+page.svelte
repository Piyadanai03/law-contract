<script lang="ts">
  // @ts-nocheck

  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import { addToast } from "$lib/stores/toastStore";
  import Toast from "$lib/Toast.svelte";

  const BACKEND_API = import.meta.env.VITE_BACKEND_API;

  const initialFormData = {
    b0: "",
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: "",
    b7: "",
    b8: "",
    b9: "",
    b10: "",
    b11: "",
    b12: "",
    b13: "",
    b14: "",
    b15: "",
    b16: ["", "", "", "", ""],
    b17: ["", "", "", "", "", "", "", ""],
    b18: ["", "", "", "", "", "", "", ""],
    b19: ["", "", "", "", "", "", "", ""],
    b20: ["", "", "", "", "", "", "", ""],
    b21: ["", "", "", "", "", "", "", ""],
    b22: ["", "", ""],
    b23: ["", "", ""],
    b24: ["", "", ""],
    b25: ["", "", ""],
    b26: ["", "", ""],
    b27: ["", "", ""],
    b28: "",
    b29: ["", "", "", "", "", "", "", "", "", ""],
    b30: ["", "", "", "", "", "", "", "", "", ""],
    b31: ["", "", "", "", "", "", "", "", "", ""],
    b32: ["", "", "", "", "", "", "", "", "", ""],
    b33: ["", "", "", "", "", "", "", "", "", ""],
    b34: "",
    b35: "",
    b36: "",
    b37: "",
    b38: "",
    b39: ["", "", "", ""],
    b40: ["", "", "", ""],
    b41: ["", "", "", ""],
    b42: ["", "", "", ""],
    b43: "",
    b44: "",
    b45: "",
    b46: "",
    b47: "",
    b48: "",
    b49: ["", "", "", "", ""],
    b50: ["", "", "", "", ""],
    b51: ["", "", "", "", ""],
    b52: ["", "", "", "", ""],
    b53: "",
    b54: "",
  };

  let formData = structuredClone(initialFormData);
  let isSubmitting = false;

  async function addDocument() {
    if (isSubmitting) return; // ป้องกันการกดซ้ำ
    isSubmitting = true;

    const isValid = ClickData();
    if (!isValid) {
      isSubmitting = false;
      return;
    }

    const response = await fetch(`${BACKEND_API}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
      body: JSON.stringify({
        document_type_id: 6,
        data: formData,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Document added successfully:", result);
      addToast("เพิ่มเอกสารสําเร็จ", "success");
      generatePDF();
      resetFormData();
    } else {
      console.error("Error adding document:", result.error);
      addToast("เพิ่มเอกสารไม่สำเร็จ", "error");
    }

    isSubmitting = false;
  }

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew");

    doc.setFontSize(18);
    doc.text("ผลการดำเนินงานสำหรับวิสาหกิจชุมชน", 70, 20);
    doc.setFontSize(14);
    doc.text("ผลการดำเนินงาน ปี ...................................", 70, 30);
    doc.text(`${formData.b0}`, 100, 29);

    doc.text("วัน/เดือน/ปีที่รับเรื่อง: .........................", 150, 25);
    doc.rect(148, 15, 55, 17);
    doc.text(`${formData.b1}`, 180, 24);

    doc.text(
      "1. ข้าพเจ้า (................)............................................. นามสกุล ....................................... วัน/เดือน/ปีเกิด ............................",
      20,
      40,
    );
    doc.text(`${formData.b2}`, 37, 39);
    doc.text(`${formData.b3}`, 53, 39);
    doc.text(`${formData.b4}`, 102, 39);
    doc.text(`${formData.b5}`, 153, 39);

    doc.text(
      "บัตรประจำตัวประชาชนผู้มอำนาจทำการแทน .................................................................",
      20,
      47,
    );
    doc.text(`${formData.b6}`, 82, 46);

    doc.text("2. ประเภทวิสาหกิจชุมชน", 20, 54);
    doc.text("   วิสาหกิจชุมชน", 60, 54);
    doc.circle(60, 53, 1.5);
    if (formData.b7 === "วิสาหกิจชุมชน") {
      doc.setFontSize(18);
      doc.text("/", 59.5, 53.5);
      doc.setFontSize(14);
    }
    doc.text("   เครือข่ายวิสาหกิจชุมชน", 90, 54);
    doc.circle(89, 53, 1.5);
    if (formData.b7 === "เครือข่ายวิสาหกิจชุมชน") {
      doc.setFontSize(18);
      doc.text("/", 88.5, 53.5);
      doc.setFontSize(14);
    }
    doc.text(
      "ชื่อ .............................................................................",
      125,
      54,
    );
    doc.text(`${formData.b9}`, 130, 53);

    doc.text(
      "ที่ตั้ง ..................................................................................................... เบอร์โทร ........................................................................................ ",
      20,
      61,
    );
    doc.text(`${formData.b10}`, 28, 60);
    doc.text(`${formData.b11}`, 124, 60);

    doc.text(
      "รหัสทะเบียน .......................................................................................",
      20,
      68,
    );
    doc.text(`${formData.b12}`, 40, 67);

    doc.text(
      "3. จำนวนสมาชิกในปีปัจจุบัน ................................ ราย",
      20,
      75,
    );
    doc.text(`${formData.b13}`, 60, 74);

    doc.text("4. สินค้า/บริการ (หลัก)", 20, 82);
    doc.text("   สินค้าหลัก", 60, 82);
    doc.circle(59, 80.5, 1.5);
    if (formData.b14 === "สินค้าหลัก") {
      doc.setFontSize(18);
      doc.text("/", 58.5, 81);
      doc.setFontSize(14);
    }

    doc.text("   บริการหลัก", 90, 82);
    doc.circle(90, 80.5, 1.5);
    if (formData.b15 === "บริการหลัก") {
      doc.setFontSize(18);
      doc.text("/", 89.5, 81);
      doc.setFontSize(14);
    }

    // ตารางสินค้า/บริการ
    doc.autoTable({
      startY: 89,
      head: [
        [
          "กลุ่มกิจกรรม",
          "ประเภทกิจกรรม",
          "หมวดกิจกรรม",
          "ชนิดสินค้า/บริการ",
          "ระบุชื่อสินค้า/บริการ",
        ],
      ],
      body: [["", "", "", "", ""]],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
    });
    doc.text(`${formData.b16[0]}`, 15, 104);
    doc.text(`${formData.b16[1]}`, 44, 104);
    doc.text(`${formData.b16[2]}`, 81, 104);
    doc.text(`${formData.b16[3]}`, 113, 104);
    doc.text(`${formData.b16[4]}`, 153, 104);

    doc.text(
      "หมายเหตุ : สินค้า/บริการ (หลัก) หมายถึง กิจกรรมที่มีการดำเนินการเป็นลำดับที่ 1 จากกิจกรรมอื่น ๆ ที่มีการดำเนินการ",
      25,
      112,
    );
    doc.text(
      "ทั้งหมด โดยให้ระบุเป็นลำดับที่ 1 ในแบบ สวช. 01 ทังนี้ หากมีการเปลี่ยนแปลงให้ยื่นคำร้องขอปรับปรุงทะเบียน (แบบ สวช.05)",
      22,
      119,
    );

    doc.text(
      "5. ทุนที่ใช้ในการประกอบกิจการของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน",
      20,
      129,
    );

    // ตารางแหล่งทุน
    doc.autoTable({
      startY: 136,
      head: [
        [
          { content: "ลำดับ", rowSpan: 2 },
          {
            content: "แหล่งทุน (บาท)",
            colSpan: 4,
            styles: { halign: "center" },
          },
          { content: "ชื่อหน่วยงานที่สนับสนุน/\nทุนจากแหล่งอื่น", rowSpan: 2 },
          { content: "เงินทุนรวม (บาท)", rowSpan: 2 },
          { content: "ปี พ.ศ. ที่มีแหล่งทุน", rowSpan: 2 },
        ],
        [
          "ระดมทุนจากสมาชิก",
          "     เงินกู้             ",
          "ได้รับการสนับสนุนจากภายนอก",
          "ทุนจากแหล่งอื่น",
        ],
      ],
      body: [
        ["1", "", "", "", "", "", "", ""],
        ["2", "", "", "", "", "", "", ""],
        ["3", "", "", "", "", "", "", ""],
        ["4", "", "", "", "", "", "", ""],
        ["5", "", "", "", "", "", "", ""],
      ],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
      tableWidth: "auto",
    });
    doc.text(`${formData.b17[0]}`, 25, 163);
    doc.text(`${formData.b17[1]}`, 51, 163);
    doc.text(`${formData.b17[2]}`, 70, 163);
    doc.text(`${formData.b17[3]}`, 109, 163);
    doc.text(`${formData.b17[4]}`, 130, 163);
    doc.text(`${formData.b17[5]}`, 161, 163);
    doc.text(`${formData.b17[6]}`, 179, 163);

    doc.text(`${formData.b18[0]}`, 25, 172);
    doc.text(`${formData.b18[1]}`, 51, 172);
    doc.text(`${formData.b18[2]}`, 70, 172);
    doc.text(`${formData.b18[3]}`, 109, 172);
    doc.text(`${formData.b18[4]}`, 130, 172);
    doc.text(`${formData.b18[5]}`, 161, 172);
    doc.text(`${formData.b18[6]}`, 179, 172);

    doc.text(`${formData.b19[0]}`, 25, 180);
    doc.text(`${formData.b19[1]}`, 51, 180);
    doc.text(`${formData.b19[2]}`, 70, 180);
    doc.text(`${formData.b19[3]}`, 109, 180);
    doc.text(`${formData.b19[4]}`, 130, 180);
    doc.text(`${formData.b19[5]}`, 161, 180);
    doc.text(`${formData.b19[6]}`, 179, 180);

    doc.text(`${formData.b20[0]}`, 25, 188);
    doc.text(`${formData.b20[1]}`, 51, 188);
    doc.text(`${formData.b20[2]}`, 70, 188);
    doc.text(`${formData.b20[3]}`, 109, 188);
    doc.text(`${formData.b20[4]}`, 130, 188);
    doc.text(`${formData.b20[5]}`, 161, 188);
    doc.text(`${formData.b20[6]}`, 179, 188);

    doc.text(`${formData.b21[0]}`, 25, 196);
    doc.text(`${formData.b21[1]}`, 51, 196);
    doc.text(`${formData.b21[2]}`, 70, 196);
    doc.text(`${formData.b21[3]}`, 109, 196);
    doc.text(`${formData.b21[4]}`, 130, 196);
    doc.text(`${formData.b21[5]}`, 161, 196);
    doc.text(`${formData.b21[6]}`, 179, 196);

    doc.text(
      "6. รายได้จากการดำเนินกิจการของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน(เก็บขอมูล 1 ม.ค. – 31 ธ.ค.)",
      20,
      207,
    );

    doc.autoTable({
      startY: 212,
      head: [
        ["ลำดับ", "ชนิดสินค้า/บริการ", "กำลังผลิต/ปี (บาท)", "รายได้/ปี (บาท)"],
      ],
      body: [
        ["1.", "", "", ""],
        ["2.", "", "", ""],
        ["3.", "", "", ""],
        ["4.", "", "", ""],
        ["5.", "", "", ""],
        ["6.", "", "", ""],
      ],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
    });

    doc.text(`${formData.b22[0]}`, 40, 226);
    doc.text(`${formData.b22[1]}`, 93, 226);
    doc.text(`${formData.b22[2]}`, 150, 226);

    doc.text(`${formData.b23[0]}`, 40, 234);
    doc.text(`${formData.b23[1]}`, 93, 234);
    doc.text(`${formData.b23[2]}`, 150, 234);

    doc.text(`${formData.b24[0]}`, 40, 243);
    doc.text(`${formData.b24[1]}`, 93, 243);
    doc.text(`${formData.b24[2]}`, 150, 243);

    doc.text(`${formData.b25[0]}`, 40, 251);
    doc.text(`${formData.b25[1]}`, 93, 251);
    doc.text(`${formData.b25[2]}`, 150, 251);

    doc.text(`${formData.b26[0]}`, 40, 260);
    doc.text(`${formData.b26[1]}`, 93, 260);
    doc.text(`${formData.b26[2]}`, 150, 260);

    doc.text(`${formData.b27[0]}`, 40, 268);
    doc.text(`${formData.b27[1]}`, 93, 268);
    doc.text(`${formData.b27[2]}`, 150, 268);

    doc.text(
      "รวมรายได้/ปี..........................................................................................................................................................................บาท",
      20,
      276,
    );
    doc.text(`${formData.b28 || ""}`, 40, 275);

    doc.addPage();

    doc.text("7. ผลการพัฒนาวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน", 20, 20);

    doc.autoTable({
      startY: 27,
      head: [
        [
          "ลำดับ",
          "ชื่อโครงการ\n/กิจกรรม",
          "พัฒนาด้าน\nการผลิต",
          "พัฒนาด้าน\nผลิตภัณฑ์",
          "พัฒนาด้าน\nการตลาด",
          "งบประมาณ(บาท)",
          "ดำเนินการได้เอง",
          "พัฒนาด้าน\nวัตถุดิบ",
          "สนับสนุนโดย\nภาครัฐ(ระบุ....)",
          "สนับสนุนโดยภาค\nเอกชน(ระบุ....)",
        ],
      ],
      body: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
      ],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
    });

    doc.text(`${formData.b29[0]}`, 15, 46);
    doc.text(`${formData.b29[1]}`, 25, 46);
    doc.text(`${formData.b29[2]}`, 42, 46);
    doc.text(`${formData.b29[3]}`, 58, 46);
    doc.text(`${formData.b29[4]}`, 74, 46);
    doc.text(`${formData.b29[5]}`, 90, 46);
    doc.text(`${formData.b29[6]}`, 114, 46);
    doc.text(`${formData.b29[7]}`, 137, 46);
    doc.text(`${formData.b29[8]}`, 153, 46);
    doc.text(`${formData.b29[9]}`, 174, 46);

    doc.text(`${formData.b30[0]}`, 15, 54);
    doc.text(`${formData.b30[1]}`, 25, 54);
    doc.text(`${formData.b30[2]}`, 42, 54);
    doc.text(`${formData.b30[3]}`, 58, 54);
    doc.text(`${formData.b30[4]}`, 74, 54);
    doc.text(`${formData.b30[5]}`, 90, 54);
    doc.text(`${formData.b30[6]}`, 114, 54);
    doc.text(`${formData.b30[7]}`, 137, 54);
    doc.text(`${formData.b30[8]}`, 153, 54);
    doc.text(`${formData.b30[9]}`, 174, 54);

    doc.text(`${formData.b31[0]}`, 15, 63);
    doc.text(`${formData.b31[1]}`, 25, 63);
    doc.text(`${formData.b31[2]}`, 42, 63);
    doc.text(`${formData.b31[3]}`, 58, 63);
    doc.text(`${formData.b31[4]}`, 74, 63);
    doc.text(`${formData.b31[5]}`, 90, 63);
    doc.text(`${formData.b31[6]}`, 114, 63);
    doc.text(`${formData.b31[7]}`, 137, 63);
    doc.text(`${formData.b31[8]}`, 153, 63);
    doc.text(`${formData.b31[9]}`, 174, 63);

    doc.text(`${formData.b32[0]}`, 15, 71);
    doc.text(`${formData.b32[1]}`, 25, 71);
    doc.text(`${formData.b32[2]}`, 42, 71);
    doc.text(`${formData.b32[3]}`, 58, 71);
    doc.text(`${formData.b32[4]}`, 74, 71);
    doc.text(`${formData.b32[5]}`, 90, 71);
    doc.text(`${formData.b32[6]}`, 114, 71);
    doc.text(`${formData.b32[7]}`, 137, 71);
    doc.text(`${formData.b32[8]}`, 153, 71);
    doc.text(`${formData.b32[9]}`, 174, 71);

    doc.text(`${formData.b33[0]}`, 15, 79);
    doc.text(`${formData.b33[1]}`, 25, 79);
    doc.text(`${formData.b33[2]}`, 42, 79);
    doc.text(`${formData.b33[3]}`, 58, 79);
    doc.text(`${formData.b33[4]}`, 74, 79);
    doc.text(`${formData.b33[5]}`, 90, 79);
    doc.text(`${formData.b33[6]}`, 114, 79);
    doc.text(`${formData.b33[7]}`, 137, 79);
    doc.text(`${formData.b33[8]}`, 153, 79);
    doc.text(`${formData.b33[9]}`, 174, 79);

    doc.text(
      "8. ลักษณะทางด้านการตลาดของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน ",
      20,
      90,
    );

    doc.text("   ออนไลน์", 35, 97);
    doc.circle(35, 96, 1.5);
    if (formData.b34.includes("ออนไลน์")) {
      doc.setFontSize(18);
      doc.text("/", 35, 96.5);
      doc.setFontSize(14);
    }

    doc.text("   ในประเทศ", 35, 104);
    doc.circle(35, 103, 1.5);
    if (formData.b34.includes("ในประเทศ")) {
      doc.setFontSize(18);
      doc.text("/", 35, 103.5);
      doc.setFontSize(14);
    }

    doc.text("   รับจ้างผลิต(OEM)", 85, 104);
    doc.circle(85, 103, 1.5);
    if (formData.b34.includes("รับจ้างผลิต(OEM)")) {
      doc.setFontSize(18);
      doc.text("/", 85, 103.5);
      doc.setFontSize(14);
    }

    doc.text("   Modern Trade", 135, 104);
    doc.circle(135, 103, 1.5);
    if (formData.b34.includes("Modern Trade")) {
      doc.setFontSize(18);
      doc.text("/", 135, 103.5);
      doc.setFontSize(14);
    }

    doc.text(
      "   ต่างประเทศ(ระบุ) .....................................................................................",
      35,
      111,
    );
    doc.circle(35, 110, 1.5);

    if (formData.b34.includes("ต่างประเทศ(ระบุ)")) {
      doc.setFontSize(18);
      doc.text("/", 35, 110.5);
      doc.setFontSize(14);
    }
    doc.text(`${formData.b38}`, 63, 110);

    doc.text("9. มาตราฐานที่ได้รับการรับรอง", 20, 118);

    doc.autoTable({
      startY: 125,
      head: [
        [
          "ลำดับ",
          "ชื่อสินค้า/บริการ",
          "มาตรฐานทีไดรับ(ระบุ ได้มากกว่า 1 มาตรฐาน)",
          "ปีที่ได้รับ",
          "หมายเลขอางอิง(ถ้ามี)",
        ],
      ],
      body: [
        ["1.", "", "", "", ""],
        ["2.", "", "", "", ""],
        ["3.", "", "", "", ""],
        ["4.", "", "", "", ""],
      ],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
    });

    doc.text(`${formData.b39[0]}`, 29, 139);
    doc.text(`${formData.b39[1]}`, 61, 139);
    doc.text(`${formData.b39[2]}`, 139, 139);
    doc.text(`${formData.b39[3]}`, 158, 139);

    doc.text(`${formData.b40[0]}`, 29, 147);
    doc.text(`${formData.b40[1]}`, 61, 147);
    doc.text(`${formData.b40[2]}`, 139, 147);
    doc.text(`${formData.b40[3]}`, 158, 147);

    doc.text(`${formData.b41[0]}`, 29, 156);
    doc.text(`${formData.b41[1]}`, 61, 156);
    doc.text(`${formData.b41[2]}`, 139, 156);
    doc.text(`${formData.b41[3]}`, 158, 156);

    doc.text(`${formData.b42[0]}`, 29, 164);
    doc.text(`${formData.b42[1]}`, 61, 164);
    doc.text(`${formData.b42[2]}`, 139, 164);
    doc.text(`${formData.b42[3]}`, 158, 164);

    doc.text("หมายเหตุ : ตัวอย่างมาตรฐานสินค้า/บริการ", 20, 173);

    doc.text("1.มาตรฐานสินค้า", 23, 180);
    doc.text("1. อย.", 55, 180);
    doc.text("6. Primary GMP", 55, 187);
    doc.text("11. OTOP.......ดาว", 55, 194);
    doc.text("2. มอก.", 90, 180);
    doc.text("7. HACCP", 90, 187);
    doc.text("12. Organic thailand", 90, 194);
    doc.text("3. มผช.", 124, 180);
    doc.text("8. GI", 124, 187);
    doc.text(
      "13. อื่น ๆ (ระบุ)......................................",
      124,
      194,
    );
    doc.text(`${formData.b53}`, 147, 193);
    doc.text("4. GAP", 147, 180);
    doc.text("9. ฮาลาล", 147, 187);
    doc.text("5. GMP.", 170, 180);
    doc.text("10. นกยูงทอง", 170, 187);
    doc.text("2. มาตรฐานบริการ", 23, 201);
    doc.text("1. มาตรฐานคุณภาพแหลงท่องเที่ยวเชงเกษตร", 55, 201);
    doc.text("2. มาตรฐานการท่องเที่ยวโดยชุมชน", 124, 201);
    doc.text("3. มาตรฐานโฮมสเตย์ไทย (Home stay)", 55, 208);
    doc.text("4. เกณฑ์คุณภาพที่พักนักเดินทาง (Home lodge)", 124, 208);
    doc.text("5. อื่น ๆ (ระบุ)......................................", 55, 215);
    doc.text(`${formData.b54}`, 76, 214);
    doc.text("10. สถานะเป็น/ไม่เป็นนิติบุคคล", 20, 222);

    doc.text("   สถานะไม่เป็นนิติบุคคล", 35, 229);
    doc.circle(30, 228, 1.5); // Adjusted circle position
    if (formData.b43 === "สถานะไม่เป็นนิติบุคคล") {
      doc.setFontSize(18);
      doc.text("/", 30, 228.5); // Adjusted text position
      doc.setFontSize(14);
    }
    doc.text(
      "เลขประจำตัวผู้เสียภาษีอากร(ถ้ามี) ..................................................",
      100,
      229,
    );
    doc.text(`${formData.b44}`, 147, 228);

    doc.text("   สถานะเป็นนิติบุคคลระบุรูปแบบนิติบุคคล", 35, 236);
    doc.circle(30, 235, 1.5); // Adjusted circle position
    if (formData.b43 === "สถานะเป็นนิติบุคคลระบุรูปแบบนิติบุคคล") {
      doc.setFontSize(18);
      doc.text("/", 30, 235.5); // Adjusted text position
      doc.setFontSize(14);
    }
    doc.text("   ห้างหุ้นส่วนสามัญนิติบุคคล ", 35, 243);
    doc.text("   ห้างหุ้นส่วนจำกัด", 35, 248);
    doc.text("   บริษัทจำกัด ", 35, 253);
    doc.text("   สถาบันการเงินประชาชน", 35, 258);
    doc.text("   สหกรณ์", 35, 263);
    doc.text("   กลุ่มเกษตรกร", 35, 268);
    doc.text("   สมาคม", 35, 273);
    doc.text("   มูลนิธิ", 35, 278);

    doc.text(
      "เลขทะเบียนนิติบุคคล .......................................................................",
      100,
      248,
    );
    doc.text(`${formData.b46}`, 129, 247);
    doc.text(
      "ชื่อนิติบุคคล ......................................................................................",
      100,
      255,
    );
    doc.text(`${formData.b47}`, 117, 254);
    doc.text(
      "ปีที่จดทะเบียน ..................................................................................",
      100,
      262,
    );
    doc.text(`${formData.b48}`, 121, 261);
    doc.rect(25, 223.5, 170, 58);
    doc.rect(25, 223.5, 170, 7.8);

    doc.addPage();
    doc.setFontSize(14);

    doc.text("11. ประวัติการฝึกอบรม/ดงานของสมาชิก", 20, 20);

    doc.autoTable({
      startY: 27,
      head: [
        [
          "ลำดับ",
          "ชื่อหลักสูตร/หัวข้อการดูงาน",
          "สถานที่ฝึกอบรม/ดูงาน",
          "หน่วยงานที่จัด",
          "ปีพ.ศ.ที่เข้าร่วม",
        ],
      ],
      body: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ],
      theme: "grid",
      styles: { font: "THSarabunNew", fontSize: 12 },
    });
    doc.text(`${formData.b49[0]}`, 17, 41);
    doc.text(`${formData.b49[1]}`, 32, 41);
    doc.text(`${formData.b49[2]}`, 88, 41);
    doc.text(`${formData.b49[3]}`, 135, 41);
    doc.text(`${formData.b49[4]}`, 165, 41);

    doc.text(`${formData.b50[0]}`, 17, 49);
    doc.text(`${formData.b50[1]}`, 32, 49);
    doc.text(`${formData.b50[2]}`, 88, 49);
    doc.text(`${formData.b50[3]}`, 135, 49);
    doc.text(`${formData.b50[4]}`, 165, 49);

    doc.text(`${formData.b51[0]}`, 17, 58);
    doc.text(`${formData.b51[1]}`, 32, 58);
    doc.text(`${formData.b51[2]}`, 88, 58);
    doc.text(`${formData.b51[3]}`, 135, 58);
    doc.text(`${formData.b51[4]}`, 165, 58);

    doc.text(`${formData.b52[0]}`, 17, 66);
    doc.text(`${formData.b52[1]}`, 32, 66);
    doc.text(`${formData.b52[2]}`, 88, 66);
    doc.text(`${formData.b52[3]}`, 135, 66);
    doc.text(`${formData.b52[4]}`, 165, 66);

    doc.text(
      "ทั้งนี้ ข้าพเจ้ายินยอมให้นำข้อมูลไปใช้เพื่อประโยชน์ต่อการจดทะเบียนฯ และประโยชน์ทางราชการ เท่านั้น",
      20,
      82,
    );
    doc.text(
      "ลงชื่อ............................................................................",
      125,
      101,
    );
    doc.text(
      "(................................................................................)",
      127,
      108,
    );
    doc.text("สมาชิกผู้มีอำนาจทำการแทน", 143, 115);
    doc.text(
      "วัน .............เดือน .............พ.ศ. .............",
      138,
      122,
    );

    doc.save("ผลการดำเนินงานสำหรับวิสาหกิจชุมชน.pdf");
    addToast("ดาวน์โหลดไฟล์สำเร็จ", "success");
  };

  function ClickData() {
    if (!formData.b0) {
      addToast("กรุณากรอกปี", "warning");
      return false;
    } else if (!formData.b1) {
      addToast("กรุณากรอกวัน/เดือน/ปีที่รับเรื่อง", "warning");
      return false;
    } else if (!formData.b2 || !formData.b3 || !formData.b4) {
      addToast("กรุณากรอกข้อมูลชื่อ-นามสกุล", "warning");
      return false;
    } else if (!formData.b5) {
      addToast("กรุณากรอกวัน/เดือน/ปีเกิด", "warning");
      return false;
    } else if (!formData.b6) {
      addToast("กรุณากรอกบัตรประจำตัวประชาชน", "warning");
      return false;
    } else if (!formData.b7) {
      addToast("กรุณาเลือกประเภทวิสาหกิจชุมชน", "warning");
      return false;
    } else if (!formData.b9) {
      addToast("กรุณากรอกชื่อวิสาหกิจชุมชน", "warning");
      return false;
    } else if (!formData.b10) {
      addToast("กรุณากรอกที่ตั้ง", "warning");
      return false;
    } else if (!formData.b11) {
      addToast("กรุณากรอกเบอร์โทร", "warning");
      return false;
    } else if (!formData.b12) {
      addToast("กรุณากรอกรหัสทะเบียน", "warning");
      return false;
    } else if (!formData.b13) {
      addToast("กรุณากรอกจำนวนสมาชิกในปีปัจจุบัน", "warning");
      return false;
    } else if (!formData.b14) {
      addToast("กรุณาเลือกสินค้า/บริการ (หลัก)", "warning");
      return false;
    } else if (!formData.b28) {
      addToast("กรุณากรอกข้อมูลรวมรายได้/ปี", "warning");
      return false;
    } else if (!formData.b43) {
      addToast("กรุณาเลือกสถานะนิติบุคคล", "warning");
      return false;
    }
    // If all validations pass
    return true;
  }

  function resetFormData() {
    formData = structuredClone(initialFormData);
    addToast("รีเซ็ตข้อมูลสำเร็จ", "success");
  }

  $: {
    if (formData.b43 === "สถานะไม่เป็นนิติบุคคล") {
      formData.b46 = "";
      formData.b47 = "";
      formData.b48 = "";
    } else if (formData.b43 === "สถานะเป็นนิติบุคคลระบุรูปแบบนิติบุคคล") {
      formData.b44 = "";
    }
  }
</script>

<div class="form-container">
  <Toast />
  <div class="header">
    <div class="title">
      <h1 class="text-2xl font-bold">ผลการดำเนินงานสำหรับวิสาหกิจชุมชน</h1>
      <div class="mt-2 text-2xl font-bold">
        <h2>ผลการดำเนินงาน ปี</h2>
        <input
          type="text"
          placeholder="พ.ศ."
          maxLength={4}
          bind:value={formData.b0}
        />
      </div>
    </div>

    <div class="date">
      <span class="flex items-center gap-2 text-gray-700 font-medium">
        วัน/เดือน/ปีที่รับเรื่อง
      </span>
      <input
        type="textbox"
        placeholder="วัน/เดือน/ปี"
        class="border border-gray-300 rounded-lg px-3 py-2 text-center"
        bind:value={formData.b1}
      />
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field full-width">
      <h1>1.ข้าพเจ้า</h1>
      <div class="dotted-line researcher-input">
        <div class="researcher-field-group">
          <input type="text" placeholder="คำนำหน้า" bind:value={formData.b2} />
          <input type="text" placeholder="ชื่อ" bind:value={formData.b3} />
          <input type="text" placeholder="นามสกุล" bind:value={formData.b4} />
        </div>
      </div>
    </div>
    <div class="field full-width">
      <h1>วัน-เดือน-ปีเกิด</h1>
      <div class="dotted-line">
        <input
          type="text"
          placeholder="วัน/เดือน/ปี"
          bind:value={formData.b5}
        />
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="field full-width">
      <h1>บัตรประจำตัวประชาชนผู้มีอำนาจทำการแทน</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b6} />
      </div>
    </div>
  </div>

  <div class="funding-source">
    <p>2.ประเภทวิสาหกิจชุมชน</p>
    <div class="checkbox-group two-col">
      <label>
        <input
          type="radio"
          name="objective"
          value="วิสาหกิจชุมชน"
          bind:group={formData.b7}
        />
        วิสาหกิจชุมชน
      </label>
      <label>
        <input
          type="radio"
          name="objective"
          value="เครือข่ายวิสาหกิจชุมชน"
          bind:group={formData.b7}
        />
        เครือข่ายวิสาหกิจชุมชน
      </label>
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field">
      <h1>ชื่อ</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b9} />
      </div>
    </div>
    <div class="field">
      <h1>ที่ตั้ง</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b10} />
      </div>
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field">
      <h1>เบอร์โทร</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b11} />
      </div>
    </div>
    <div class="field">
      <h1>รหัสทะเบียน</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b12} />
      </div>
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field">
      <h1>3.จำนวนสมาชิกในปีปัจจุบัน</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b13} />
      </div>
      <h2>ราย</h2>
    </div>
  </div>

  <div class="funding-source">
    <p>4.สินค้า/บริการ (หลัก)</p>
    <div class="checkbox-group two-col">
      <label>
        <input
          type="radio"
          name="grant"
          value="สินค้าหลัก"
          bind:group={formData.b14}
        />
        สินค้าหลัก
      </label>
      <label>
        <input
          type="radio"
          name="grant"
          value="บริการหลัก"
          bind:group={formData.b14}
        />
        บริการหลัก
      </label>
    </div>
    <table>
      <thead>
        <tr>
          <th style="text-align: center; vertical-align: top;"
            >กลุ่มกิจการ/กิจกรรม</th
          >
          <th style="text-align: center; vertical-align: top;"
            >ประเภทกิจการ/กิจกรรม</th
          >
          <th style="text-align: center; vertical-align: top;"
            >หมวดกิจการ/กิจกรรม
          </th>
          <th style="text-align: center; vertical-align: top;"
            >ชนิดสินค้า/บริการ
          </th>
          <th style="text-align: center; vertical-align: top;"
            >ระบุชื่อสินค้า/บริการ</th
          >
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b16[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b16[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b16[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b16[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b16[4]}
            /></td
          >
        </tr>
      </tbody>
    </table>
    <div class="form-row">
      <div class="field">
        <p>
          หมายเหตุ : สินค้า/บริการ (หลัก) หมายถึง
          กิจกรรมที่มีการดำเนินการเป็นลำดับที่ 1 จากกิจกรรมอื่น ๆ
          ที่มีการดำเนินการ ทั้งหมด โดยให้ระบุเป็นลำดับที่ 1 ในแบบ สวช. 01
          ทังนี้ หากมีการเปลี่ยนแปลงให้ยื่นคำร้องขอปรับปรุงทะเบียน (แบบ สวช.05)
        </p>
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <p>5.ทุนที่ใช้ในการประกอบกิจการของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน</p>
    </div>
    <table>
      <thead>
        <tr>
          <th rowspan="2" style="text-align: center; vertical-align: middle;"
            >ลำดับ</th
          >
          <th colspan="4" style="text-align: center; vertical-align: top;"
            >แหล่งทุน (บาท)</th
          >
          <th rowspan="2" style="text-align: center; vertical-align: top;"
            >ชื่อหน่วยงานที่สนับสนุน/ทุนจากแหล่งอื่นระบบรายละเอียด</th
          >
          <th rowspan="2" style="text-align: center; vertical-align: top;"
            >เงินทุนรวม (บาท)</th
          >
          <th rowspan="2" style="text-align: center; vertical-align: top;"
            >ปี พ.ศ. ที่มาของแหล่งทุน</th
          >
        </tr>
        <tr>
          <th style="text-align: center; vertical-align: top;"
            >ระดมหุ้นจากสมาชิก</th
          >
          <th style="text-align: center; vertical-align: top;">เงินกู้</th>
          <th style="text-align: center; vertical-align: top;"
            >ได้รับการสนับสนุนจากภายนอก</th
          >
          <th style="text-align: center; vertical-align: top;"
            >ทุนจากแหล่งอื่น</th
          >
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: middle;">1</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[4]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[5]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b17[6]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">2</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[4]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[5]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b18[6]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">3</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[4]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[5]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b19[6]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">4</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[4]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[5]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b20[6]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">5</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[3]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[4]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[5]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b21[6]}
            /></td
          >
        </tr>
      </tbody>
    </table>
  </div>

  <div class="form-row">
    <div class="field">
      <p>
        6.รายได้จากการดำเนินกิจการของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน(เก็บขอมูล
        1 ม.ค. – 31 ธ.ค.)
      </p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="text-align: center; vertical-align: middle;">ลำดับ</th>
        <th style="text-align: center; vertical-align: middle;"
          >ชนิดสินค้า/บริการ</th
        >
        <th style="text-align: center; vertical-align: middle;"
          >กำลังผลิต/ปี(บาท)</th
        >
        <th style="text-align: center; vertical-align: middle;"
          >รายได้/ปี(บาท)</th
        >
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center; vertical-align: middle;">1.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b22[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b22[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b22[2]} /></td
        >
      </tr>
      <tr>
        <td style="text-align: center; vertical-align: middle;">2.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b23[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b23[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b23[2]} /></td
        >
      </tr>
      <tr>
        <td style="text-align: center; vertical-align: middle;">3.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b24[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b24[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b24[2]} /></td
        >
      </tr>
      <tr>
        <td style="text-align: center; vertical-align: middle;">4.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b25[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b25[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b25[2]} /></td
        >
      </tr>
      <tr>
        <td style="text-align: center; vertical-align: middle;">5.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b26[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b26[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b26[2]} /></td
        >
      </tr>
      <tr>
        <td style="text-align: center; vertical-align: middle;">6.</td>
        <td
          ><input type="text" placeholder="" bind:value={formData.b27[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b27[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b27[2]} /></td
        >
      </tr>
    </tbody>
  </table>

  <div class="form-row two-col">
    <div class="field">
      <h1>รวมรายได้/ปี</h1>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b28} />
      </div>
    </div>
    <div class="field">
      <h1>บาท</h1>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h1>7.ผลการพัฒนาวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน</h1>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th rowspan="2" style="text-align: center; vertical-align: middle;"
          >ลำดับ</th
        >
        <th rowspan="2" style="text-align: center; vertical-align: top;"
          >ชื่อโครงการ/กิจกรรม</th
        >
        <th colspan="4" style="text-align: center; vertical-align: top;"
          >พัฒนาด้าน</th
        >
        <th rowspan="2" style="text-align: center; vertical-align: top;"
          >งบประมาณ(บาท)</th
        >
        <th rowspan="2" style="text-align: center; vertical-align: top;"
          >ดำเนินการได้เอง</th
        >
        <th rowspan="2" style="text-align: center; vertical-align: top;"
          >สนับสนุนโดยภาครัฐ(ระบุ....)</th
        >
        <th rowspan="2" style="text-align: center; vertical-align: top;"
          >สนับสนุนโดยภาคเอกชน(ระบุ....)
        </th>
      </tr>
      <tr>
        <th style="text-align: center; vertical-align: top;">การผลิต</th>
        <th style="text-align: center; vertical-align: top;">วัตถุดิบ</th>
        <th style="text-align: center; vertical-align: top;">ผลิตภัณฑ์</th>
        <th style="text-align: center; vertical-align: top;">การตลาด</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[4]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[5]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[6]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[7]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[8]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b29[9]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[4]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[5]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[6]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[7]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[8]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b30[9]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[4]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[5]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[6]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[7]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[8]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b31[9]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[4]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[5]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[6]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[7]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[8]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b32[9]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[4]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[5]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[6]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[7]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[8]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b33[9]} /></td
        >
      </tr>
    </tbody>
  </table>

  <div class="funding-source">
    <p>
      8.ลักษณะทางด้านการตลาดของวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน(เลือกได้มากกว่า
      1 ข้อ)
    </p>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" value="ออนไลน์" bind:group={formData.b34} />
        ออนไลน์
      </label>
      <label>
        <input type="checkbox" value="ในประเทศ" bind:group={formData.b34} />
        ในประเทศ
      </label>
      <label>
        <input
          type="checkbox"
          value="รับจ้างผลิต(OEM)"
          bind:group={formData.b34}
        />
        รับจ้างผลิต(OEM)
      </label>
      <label>
        <input type="checkbox" value="Modern Trade" bind:group={formData.b34} />
        Modern Trade
      </label>
      <label>
        <input
          type="checkbox"
          value="ต่างประเทศ(ระบุ)"
          bind:group={formData.b34}
        />
        ต่างประเทศ(ระบุ)
      </label>
      {#if formData.b34.includes("ต่างประเทศ(ระบุ)")}
        <input
          type="text"
          bind:value={formData.b38}
          placeholder="ระบุประเทศ"
          class="border p-1 ml-2"
        />
      {/if}
    </div>

    <div class="form-row">
      <div class="field">
        <h1>9.มาตราฐานที่ได้รับการรับรอง</h1>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="text-align: center; vertical-align: middle;">ลำดับ</th>
          <th style="text-align: center; vertical-align: top;"
            >ชื่อสินค้า/บริการ</th
          >
          <th style="text-align: center; vertical-align: top;"
            >มาตรฐานที่ได้รับ (ระบุ ได้มากกว่า 1 มาตรฐาน)</th
          >
          <th style="text-align: center; vertical-align: top;">ปีที่ได้รับ</th>
          <th style="text-align: center; vertical-align: top;"
            >หมายเลขอ้างอิง (ถ้ามี)</th
          >
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: middle;">1</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b39[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b39[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b39[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b39[3]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">2</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b40[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b40[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b40[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b40[3]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">3</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b41[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b41[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b41[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b41[3]}
            /></td
          >
        </tr>
        <tr>
          <td style="text-align: center; vertical-align: middle;">4</td>
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b42[0]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b42[1]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b42[2]}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder=""
              bind:value={formData.b42[3]}
            /></td
          >
        </tr>
      </tbody>
    </table>

    <div class="form-row">
      <div class="field">
        <h2>หมายเหตุ : ตัวอย่างมาตรฐานสินค้า/บริการ</h2>
      </div>
    </div>

    <div class="form-row">
      <div class="field">
        <h3>1.มาตรฐานสินค้า</h3>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h3>1.อย.</h3>
      </div>
      <div class="field">
        <h3>2.มอก.</h3>
      </div>
      <div class="field">
        <h3>3.มผช.</h3>
      </div>
    </div>
  </div>

  <div class="form-row three-col">
    <div class="field">
      <h3>4.GAP</h3>
    </div>
    <div class="field">
      <h3>5.GMP</h3>
    </div>
    <div class="field">
      <h3>6.Primary GMP</h3>
    </div>
  </div>

  <div class="form-row three-col">
    <div class="field">
      <h3>7.HACCP</h3>
    </div>
    <div class="field">
      <h3>8.GI</h3>
    </div>
    <div class="field">
      <h3>9.ฮาลาล</h3>
    </div>
  </div>

  <div class="form-row three-col">
    <div class="field">
      <h3>10.นกยูงทอง</h3>
    </div>
    <div class="field">
      <h3>11.OTOP......ดาว</h3>
    </div>
    <div class="field">
      <h3>12.Organic thailand</h3>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h3>13.อื่น ๆ(ระบุ)</h3>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b53} />
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h3>2.มาตรฐานบริการ</h3>
    </div>
  </div>

  <div class="form-row three-col">
    <div class="field">
      <h3>1.มาตรฐานคุณภาพแหลงท่องเที่ยวเชิงเกษตร</h3>
    </div>
    <div class="field">
      <h3>2.มาตรฐานการท่องเที่ยวโดยชุมชน</h3>
    </div>
    <div class="field">
      <h3>3.มาตรฐานโฮมสเตย์ไทย (Home stay)</h3>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h3>4.เกณฑ์คุณภาพที่พักนักเดินทาง (Home lodge)</h3>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h3>5.อื่น ๆ(ระบุ)</h3>
      <div class="dotted-line">
        <input type="text" bind:value={formData.b54} />
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h3>10. สถานะเป็น/ไม่เป็นนิติบุคคล</h3>
    </div>
  </div>

  <div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <div class="checkbox-group">
                <input
                  type="radio"
                  id="not-juristic"
                  name="juristic-status"
                  value="สถานะไม่เป็นนิติบุคคล"
                  bind:group={formData.b43}
                />
                <label for="not-juristic">สถานะไม่เป็นนิติบุคคล</label>
              </div>
              <div class="form-row">
                <div class="field">
                  <h1>เลขประจำตัวผู้เสียภาษีอากร(ถ้ามี)</h1>
                  <div class="dotted-line">
                    <input type="text" bind:value={formData.b44} />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="checkbox-group">
                <input
                  type="radio"
                  id="juristic"
                  name="juristic-status"
                  value="สถานะเป็นนิติบุคคลระบุรูปแบบนิติบุคคล"
                  bind:group={formData.b43}
                />
                <label for="juristic"
                  >สถานะเป็นนิติบุคคลระบุรูปแบบนิติบุคคล</label
                >
              </div>
              <ul>
                <li>ห้างหุ้นส่วนสามัญนิติบุคคล</li>
                <li>ห้างหุ้นส่วนจำกัด</li>
                <li>บริษัทจำกัด</li>
                <li>สถาบันการเงินประชาชน</li>
                <li>สหกรณ์</li>
                <li>กลุ่มเกษตรกร</li>
                <li>สมาคม</li>
                <li>มูลนิธิ</li>
              </ul>
              <div class="form-row">
                <div class="field">
                  <h1>เลขทะเบียนนิติบุคคล</h1>
                  <div class="dotted-line">
                    <input type="text" bind:value={formData.b46} />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <h1>ชื่อนิติบุคคล</h1>
                  <div class="dotted-line">
                    <input type="text" bind:value={formData.b47} />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <h1>ปีที่จดทะเบียน</h1>
                  <div class="dotted-line">
                    <input type="text" bind:value={formData.b48} />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="form-row">
    <div class="field">
      <h1>11.ประวัติการฝึกอบรม/ดงานของสมาชิก</h1>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%; text-align: center; vertical-align: top;"
          >ลำดับ</th
        >
        <th style="width: 30%; text-align: center; vertical-align: top;"
          >ชื่อหลักสูตร/หัวข้อการดูงาน</th
        >
        <th style="width: 30%; text-align: center; vertical-align: top;"
          >สถานที่ฝึกอบรม/ดูงาน</th
        >
        <th style="width: 20%; text-align: center; vertical-align: top;"
          >หน่วยงานที่จัด</th
        >
        <th style="width: 15%; text-align: center; vertical-align: top;"
          >ปีพ.ศ.ที่เข้าร่วม</th
        >
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b49[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b49[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b49[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b49[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b49[4]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b50[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b50[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b50[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b50[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b50[4]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b51[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b51[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b51[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b51[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b51[4]} /></td
        >
      </tr>
      <tr>
        <td
          ><input type="text" placeholder="" bind:value={formData.b52[0]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b52[1]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b52[2]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b52[3]} /></td
        >
        <td
          ><input type="text" placeholder="" bind:value={formData.b52[4]} /></td
        >
      </tr>
    </tbody>
  </table>
  <div class="button-container flex space-x-4 mt-4 justify-center">
    <button
      on:click={addDocument}
      class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      disabled={isSubmitting}
    >
      บันทึกเอกสาร
    </button>
    {#if isSubmitting}
      <span class="loading loading-spinner"></span>
    {/if}
    <button
      on:click={generatePDF}
      class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      พิมพ์ PDF
    </button>
    <button
      on:click={resetFormData}
      class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
    >
      ล้างข้อมูล
    </button>
  </div>
</div>

<style>
  button {
    margin: auto;
    display: block;
  }
  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .checkbox-group input[type="radio"] {
    margin-right: 10px;
  }

  input {
    text-align: center;
  }

  ::placeholder {
    text-align: center;
  }

  .form-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px;
    background: white;
    font-family: "Kanit", sans-serif;
    margin-left: 50px;
    margin-right: 50px;
    padding-bottom: 5rem; /* Add padding to prevent overlap with footer */
  }

  .header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    position: relative;
  }

  .title {
    text-align: center;
    flex-grow: 1;
  }

  .title h1,
  .title h2 {
    margin: 0;
    font-weight: normal;
  }

  .form-row {
    margin-bottom: 20px;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .three-col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .full-width {
    width: 100%;
  }

  .dotted-line {
    flex-grow: 1;
    border-bottom: 1px dotted #000;
    position: relative;
  }

  input[type="text"] {
    width: 100%;
    border: none;
    background: transparent;
    padding: 5px 0;
    font-family: "Sarabun", sans-serif;
  }

  input[type="text"]:focus {
    outline: none;
  }

  .checkbox-group {
    margin: 10px 0;
    padding-left: 20px;
  }

  .checkbox-group label {
    display: block;
    margin: 5px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid #000;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }

  .researcher-input {
    position: relative;
  }

  .researcher-field-group {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .researcher-field-group input {
    flex: 1;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #000;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
  }

  th,
  td {
    border: 1px solid #000;
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
  }

  .button-container {
    display: flex;
    justify-content: center; /* จัดให้อยู่กึ่งกลางแนวนอน */
    gap: 16px; /* กำหนดระยะห่างระหว่างปุ่ม */
    margin-top: 20px; /* กำหนดระยะห่างจากด้านบน */
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 20px;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .title {
      text-align: left;
    }

    .two-col {
      grid-template-columns: 1fr;
    }

    .three-col {
      grid-template-columns: 1fr;
    }

    table {
      font-size: 0.9rem;
    }

    th,
    td {
      padding: 5px;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 10px;
    }

    .header {
      align-items: center;
    }

    .title h1,
    .title h2 {
      font-size: 1.2rem;
    }

    table {
      font-size: 0.8rem;
    }

    th,
    td {
      padding: 3px;
    }

    input[type="text"] {
      font-size: 0.9rem;
    }

    button {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
  }
</style>
