<script lang="ts">
  import { onMount } from "svelte";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import Toast from "$lib/Toast.svelte";
  import { addToast } from "$lib/stores/toastStore";

  const BACKEND_API = import.meta.env.VITE_BACKEND_API; 
  const initialFormData = {
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
    c9: "",
    c10: "",
    c11: "",
    c12: "",
    c13: "",
    c14: "",
    c15: "",
    c16: "",
    c17: "",
    c18: "",
    c19: "",
    c20: "",
    c21: "",
    c22: "",
    c23: "",
    c24: "",
    c25: "",
    c26: "",
    c27: "",
    c28: "",
    c29: "",
    c30: "",
    c31: "",
    c32: "",
    c33: "",
  };

  let isSubmitting = false;

  let formData: Partial<typeof initialFormData> =
    structuredClone(initialFormData);

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
        "Authorization": `Bearer ${localStorage.getItem('sessionToken')}`
      },
      body: JSON.stringify({
        document_type_id: 2,
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

  function ClickData() {
    const fieldNames = {
      c1: "เลขที่สัญญา",
      c2: "วันที่",
      c3: "ชื่อผู้ขาย",
      c4: "อายุ",
      c5: "บ้านเลขที่",
      c6: "หมู่ที่",
      c7: "ซอย",
      c8: "ถนน",
      c9: "ตำบล",
      c10: "อำเภอ",
      c11: "จังหวัด",
      c12: "ชื่อผู้ซื้อ",
      c13: "ชื่อผู้เเทน",
      c14: "เลขที่สำนักงาน",
      c15: "หมู่ที่",
      c16: "ซอย",
      c17: "ถนน",
      c18: "ตำบล",
      c19: "อำเภอ",
      c20: "จังหวัด",
      c21: "ชื่อผู้ขาย",
      c22: "วันที่เริ่มสัญญา",
      c23: "วันที่สิ้นสุดสัญญา",
      c24: "พื้นที่",
      c25: "งาน",
      c26: "ตารางวา",
      c27: "หมู่ที่",
      c28: "ซอย",
      c29: "ถนน",
      c30: "ตำบล",
      c31: "อำเภอ",
      c32: "จังหวัด",
      c33: "รายละเอียด",
    };

    for (const [key, label] of Object.entries(fieldNames)) {
      if (!formData[key as keyof typeof formData]) {
        addToast(`กรุณากรอก${label}`, "warning");
        return false;
      }
    }

    return true;
  }

  function resetFormData() {
    formData = structuredClone(initialFormData);
    addToast("รีเซ็ตฟอร์มสำเร็จ", "success");
  }

  function generatePDF() {
    const doc = new jsPDF();

    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew", "normal");

    doc.setFontSize(14);
    doc.text("เลขที่สัญญา..............................", 20, 20);
    doc.text(`${formData.c1}`, 36, 19);

    doc.setFontSize(18);
    doc.text("สัญญาซื้อขายข้าวโพดล่วงหน้า", 105, 45, {
      align: "center",
    });
    doc.text(`โครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา`, 105, 52, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("วันที่...............................................", 160, 74, {
            align: "center",
        });
        doc.text(`${formData.c2}`, 145, 73);

    doc.text("สัญญาฉบับนี้ทำขึ้นระหว่าง........................................................................................อายุ..............................................", 25, 81);
    doc.text(`${formData.c3}`, 60, 80);
    doc.text(`${formData.c4}`, 137, 80);

    doc.text("อยู่บ้านเลขที่....................................หมู่ที่....................................ซอย....................................ถนน..........................................", 20, 88);
    doc.text(`${formData.c5}`, 37, 87);
    doc.text(`${formData.c6}`, 72, 87);
    doc.text(`${formData.c7}`, 107, 87);
    doc.text(`${formData.c8}`, 141, 87);

    doc.text("ตำบล..........................................อำเภอ..........................................จังหวัด..........................................ซึ่งเรียกว่า “ผู้ขาย” ฝ่ายหนึ่ง", 20, 95);
    doc.text(`${formData.c9}`, 29, 94);
    doc.text(`${formData.c10}`, 71, 94);
    doc.text(`${formData.c11}`, 113, 94);

    doc.text("กับ.........................................................................................โดยมี.........................................................................................", 20, 102);
    doc.text(`${formData.c12}`, 25, 101);
    doc.text(`${formData.c13}`, 103, 101);

    doc.text("เป็นผู้เเทน สำนักงานตั้งอยู่ที่เลขที่....................................หมู่ที่....................................ซอย....................................", 20, 109);
    doc.text(`${formData.c14}`, 64, 108);
    doc.text(`${formData.c15}`, 99, 108);
    doc.text(`${formData.c16}`, 133, 108);

    doc.text("ถนน.......................................ตำบล.......................................อำเภอ.......................................จังหวัด.......................................", 20, 116);
    doc.text(`${formData.c17}`, 27, 115);
    doc.text(`${formData.c18}`, 65, 115);
    doc.text(`${formData.c19}`, 105, 115);
    doc.text(`${formData.c20}`, 145, 115);

    doc.text("ซึ่งต่อไปนี้เรียกว่า “ผู้ซื้อ” อีกฝ่ายหนึ่ง โดยคู่สัญญาทั้งสองฝ่ายตกลงทำสัญญาร่วมกันตามรายละเอียด และเงื่อนไขดังต่อไปนี้", 20, 123);

    doc.text("ข้อ ๑. วัตถุประสงค์ของสัญญา", 20, 130);
    doc.text("ผู้ซื้อประกอบธุรกิจ...............................................................................................และผู้ขายมีความประสงค์ที่จะนำข้าวโพด", 25, 137);
    doc.text(`${formData.c21}`, 46, 136);
    doc.text("มาขายให้แก่ผู้ซื้อตามโครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา โดยผู้ขายจะเป็น ผู้จัดหาพื้นที่", 20, 144);
    doc.text("สำหรับเพาะปลูก ดำเนินการเพาะปลูก โดยต้นทุนทางด้านระบบชลประทาน กำลังคน และค่าใช้จ่ายในการเพาะปลูก ", 20, 151);
    doc.text("เพื่อปฏิบัติตามสัญญาให้ผู้ขายเป็นผู้รับผิดชอบ ", 20, 158);
    doc.text("ผู้ซื้อและผู้ขายตกลงจะให้ความร่วมมือกันอย่างเต็มที่เพื่อผลักดันและส่งเสริมให้การดำเนินการ ในโครงการสานพลังประชารัฐ ", 25, 165);
    doc.text("เพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนาทั้งหมด ตามราคาที่ตกลงไว้ในข้อ ๕. โดยไม่มีการเปลี่ยนแปลง", 20, 172);

    doc.text("ข้อ ๒. ระยะเวลาในการปฏิบัติตามสัญญา", 20, 179);
    doc.text("สัญญาฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่..................................................ถึงวันที่..................................................", 25, 186);
    doc.text(`${formData.c22}`, 72, 185);
    doc.text(`${formData.c23}`, 121, 185);

    doc.text("ข้อ ๓. รายละเอียดของสถานที่ปลูกข้าวโพด", 20, 193);
    doc.text("สถานที่ตั้งของแปลงข้าวโพดซึ่งผู้ขายใช้ปลูกข้าวโพดเพื่อส่งมอบให้แก่ผู้ซื้อตามสัญญาฉบับนี้มีพื้นที่.......................ไร่", 25, 200);
    doc.text(`${formData.c24}`, 150, 199);
    doc.text(".......................งาน.......................ตารางวา", 20, 207);
    doc.text(`${formData.c25}`, 21, 206);
    doc.text(`${formData.c26}`, 60, 206);
    doc.text("หมู่ที่.......................ซอย.......................ถนน.......................ตำบล.......................อำเภอ.......................จังหวัด.......................", 20, 214);
    doc.text(`${formData.c27}`, 27, 213);
    doc.text(`${formData.c28}`, 51, 213);
    doc.text(`${formData.c29}`, 76, 213);
    doc.text(`${formData.c30}`, 101, 213);
    doc.text(`${formData.c31}`, 129, 213);
    doc.text(`${formData.c32}`, 155, 213);
    doc.text("รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญาฉบับนี้", 20, 221);

    doc.setFontSize(18);
    doc.text("/ข้อ ๔. ...", 170, 241);

    doc.setFontSize(14);
    doc.text("๑", 100, 251);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสมและความประสงค์ของคู่สัญญา ทั้งนี้ให้เป็นไปตามมาตรา ๒๑ และ ๒๖",
      25,
      258
    );
    doc.text("แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบเกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 265);

    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("สัญญาเลขที่.....................", 20, 20);
    doc.text(`${formData.c1}`, 36, 19);

    doc.text("ข้อ ๔. หน้าที่ของคู่สัญญา", 20, 30);
    doc.text("๔.๑ หน้าที่ของผู้ซื้อ", 25, 37);
    doc.text("๑) รับซื้อผลผลิตทั้งหมดที่เป็นไปตามมาตรฐานคุณภาพข้าวโพดเลี้ยงสัตว์ของสมาคมผู้ผลิต อาหารสัตว์ไทย ", 30, 44);
    doc.text("(ข้าวโพดเลี้ยงสัตว์เบอร์ ๒ ความชื้นไม่เกินร้อยละ ๑๔.๕)", 20, 51);
    doc.text("๒) การเข้าไปมีส่วนร่วมในการผลิตที่จำเป็นในการเพาะปลูกให้กับเกษตรกร ได้แก่ การจัด ปัจจัยการผลิต ", 30, 58);
    doc.text("การส่งเจ้าหน้าที่ลงแปลงเพื่อตรวจสอบ หรือให้คำแนะนำ เป็นต้น ให้คิดมูลค่าโดยอ้างอิงจาก ราคาตลาด", 20, 65);
    doc.text("ณ วันที่ส่งมอบให้แก่เกษตรกร พร้อมทั้งแนบรายละเอียดวิธีการคิดราคาที่ชัดเจน", 20, 72);
    doc.text("๓) จัดเตรียมสถานที่สำหรับรับมอบข้าวโพดจากผู้ขายเพื่อให้ผู้ขายส่งมอบข้าวโพดตามสัญญา", 30, 79);

    doc.text("๔.๒ หน้าที่ของผู้ขาย", 25, 86);
    doc.text("๑) ผู้ขายรับรองว่าข้าวโพดที่ตกลงซื้อขายตามสัญญาฉบับนี้ เป็นข้าวโพดในโครงการสานพลัง", 30, 93);
    doc.text("ประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา และมิได้เป็นข้าวโพดที่ผู้ขายรับซื้อมาจากเกษตรกรรายอื่น", 20, 100);
    doc.text("๒) ผู้ขายมีหน้าที่รับผิดชอบ การเตรียมดิน การปลูก การกำจัดวัชพืชและศัตรูพืช การเก็บเกี่ยว ระบบชลประทาน ", 30, 107);
    doc.text("และกำลังคน เพื่อปฏิบัติตามสัญญา โดยเป็นค่าใช้จ่ายของผู้ขายเอง", 20, 114);
    doc.text("๓) ผู้ขายจะต้องส่งมอบผลิตผลทั้งหมดตามวัน เวลา และสถานที่ที่กำหนด ให้แก่ผู้ซื้อ แต่เพียงผู้เดียว", 30, 121);
    doc.text("หากผู้ขายไม่ปฏิบัติตามข้อตกลงนี้ไม่ว่าด้วยประการใดๆ ย่อมถือว่าผู้ขายผิดสัญญา", 20, 128);

    doc.text("ข้อ ๕. ราคาและวิธีการคำนวณราคาวัตถุดิบและผลิตผลทางการเกษตร", 20, 135);
    doc.text("ผู้ขายและผู้ซื้อตกลงราคาซื้อขายข้าวโพดตามราคาตามที่กระทรวงพาณิชย์กำหนด โดยคำนวณ น้าหนักข้าวโพดเป็นเมตริกตัน", 25, 142);
    doc.text("รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญาฉบับนี้", 20, 149);

    doc.text("ข้อ ๖. การชำระเงิน", 20, 156);
    doc.text("ผู้ขายและผู้ซื้อตกลงทำการสรุปราคา ปริมาณและคุณภาพของ ข้าวโพดที่ซื้อขายกันตามสัญญานี้ ภายใน ๗ วัน", 25, 163);
    doc.text("นับแต่วันที่ผู้ซื้อได้รับมอบข้าวโพดจากผู้ขาย โดยที่ผู้ซื้อตกลงที่จะช าระราคาข้าวโพดให้แก่ผู้ขาย ภายใน ๗ วัน ", 20, 170);
    doc.text("นับแต่วันที่ทำการสรุปราคาข้าวโพด", 20, 177);

    doc.text("ข้อ ๗. เหตุยกเว้นการไม่ปฏิบัติตามสัญญาในกรณีที่เกิดเหตุสุดวิสัย หรือเกิดสถานการณ์ที่ไม่สามารถ คาดการณ์หรือหลีกเลี่ยงได้", 20, 184);
    doc.text("และอยู่นอกเหนือการควบคุมของคู่สัญญา", 20, 191);
    doc.text("ในกรณีที่มีเหตุสุดวิสัยหรือเหตุหนึ่งเหตุใดที่อยู่นอกเหนือการควบคุมของคู่สัญญา ได้แก่ อัคคีภัย อุทกภัย วาตภัย ", 25, 198);
    doc.text("ภัยธรรมชาติ เป็นต้น อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญา คู่สัญญา ทั้งสองฝ่ายจะตกลงร่วมกันในการกำหนดแนวทาง", 20, 205);
    doc.text("แก้ไขปัญหาดังกล่าวเพื่อบรรเทาความเสียหายที่เกิดขึ้น", 20, 212);

    doc.setFontSize(18);
    doc.text("/ข้อ ๘. ... ", 170, 247);

    doc.setFontSize(14);
    doc.text("๒", 100, 257);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสมและความประสงค์ของคู่สัญญา ทั้งนี้ให้เป็นไปตามมาตรา ๒๑ และ ๒๖",
      25,
      264
    );
    doc.text("แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบเกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 271);

    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text("สัญญาเลขที่.....................", 20, 20);
    doc.text(`${formData.c1}`, 36, 19);

    doc.text("ข้อ ๘. กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลิตผลทางการเกษตร", 20, 30);
    doc.text("ผู้ขายและผู้ซื้อตกลงกันให้กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลิตผลทางการเกษตร", 25, 37);
    doc.text("เป็นกรรมสิทธิ์ของผู้ซื้อหรือผู้ขายแล้วแต่กรณี โดยให้พิจารณาว่าผู้ขายหรือผู้ซื้อเป็นผู้จัดหาทรัพย์สินดังกล่าว เพื่อนำมาใช้ในการผลิต", 20, 44);

    doc.text("ข้อ ๙. ผู้รับความเสี่ยงภัยในผลิตผลทางการเกษตร และความเสี่ยงทางการค้าในกรณีที่ผลิตผลทางการ", 20, 51);
    doc.text("เกษตรไม่สามารถจำหน่ายได้ตามราคาที่กำหนดไว", 25, 58);
    doc.text("๑) ในระหว่างการปลูกหากเกิดโรคระบาดและเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติ ตามสัญญาข้อใดข้อหนึ่งได้", 25, 65);
    doc.text("ให้คู่สัญญาตกลงร่วมกันเพื่อบรรเทาความเสียหายที่เกิดขึ้น เว้นแต่กรณีที่ โรคระบาดนั้นเกิดจากความผิดของผู้ขาย ", 20, 72);
    doc.text("ผู้ขายจะต้องรับภาระในความเสียหายที่เกิดขึ้น", 20, 79);
    doc.text("๒) ในกรณีที่ผลิตผลทางการเกษตรไม่สามารถจำหน่ายได้ตามราคาที่กำหนดไว้ผู้ซื้อตกลง", 25, 86);
    doc.text("ที่จะรับซื้อข้าวโพดตามโครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนาทั้งหมด", 20, 93);
    doc.text("ตามราคาที่ตกลงไว้ในข้อ ๕. โดยไม่มีการเปลี่ยนแปลง", 20, 100);

    doc.text("ข้อ ๑๐. การเยียวยาความเสียหายจากการผิดสัญญา", 20, 107);
    doc.text("ในกรณีที่เกิดความเสียหายจากคู่สัญญาที่ไม่สามารถปฏิบัติตามสัญญา คู่สัญญาฝ่ายที่ก่อให้เกิดความ", 25, 114);
    doc.text("สัญญาอีกฝ่ายหนึ่งในอัตรา...............................................................", 20, 121);
    doc.text(`${formData.c33}`, 55, 120);

    doc.text("ข้อ ๑๑. สิทธิในการบอกเลิกสัญญาของคู่สัญญา", 20, 127);
    doc.text("หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งไม่ปฏิบัติตามข้อตกลงในสัญญาไม่ว่าข้อใดข้อหนึ่ง หรือหลายข้อรวมกัน", 25, 134);
    doc.text("คู่สัญญาอีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญาและเรียกค่าเสียหายได้ทันที และให้ถือว่าสัญญาสิ้นสุดลง", 20, 141);
    doc.text("สัญญาฉบับนี้ทำขึ้นสองฉบับ มีข้อความถูกต้องตรงกัน คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความ", 25, 148);
    doc.text("ในสัญญานี้ดีแล้ว และเห็นว่าเป็นไปตามเจตนาของตน จึงลงลายมือชื่อไว้ต่อหน้าพยานเป็นสำคัญ ณ วัน เดือน ปี", 20, 155);
    doc.text("ตามที่ระบุไว้ข้างต้น โดยคู่สัญญาต่างยึดถือไว้ฝ่ายละฉบับ", 20, 162);

    doc.text(
      `ลงชื่อ.......................................ผู้ขาย                            ลงชื่อ.......................................ผู้ซื้อ`,
      25,
      174
    );
    doc.text(
      `      (............................................)                                  (............................................)`,
      25,
      181
    );
    doc.text(
      `ลงชื่อ.......................................พยาน                            ลงชื่อ.......................................พยาน`,
      25,
      208
    );
    doc.text(
      `      (............................................)                                   (............................................)`,
      25,
      215
    );

    doc.text("๓", 100, 235);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสมและความประสงค์ของคู่สัญญา ทั้งนี้ให้เป็นไปตามมาตรา ๒๑ และ ๒๖",
      25,
      245
    );

    doc.text("แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบเกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 252);

    // บันทึกเอกสารเป็นไฟล์ PDF
    doc.save("สัญญาซื้อขายข้าวโพด.pdf");
    addToast ("ดาวน์โหลดไฟล์สำเร็จ", "success");
  }
</script>

<div>
  <Toast />
  <div class="form-container">
    <div class="header">
      <div class="title">
        <h1 class="text-2xl font-bold center">สัญญาซื้อขายข้าวโพดล่วงหน้า</h1>
        <h2 class="text-2xl">
          โครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา
        </h2>
      </div>
    </div>

    <div class="form-row two-col right-aligned1">
      <div class="field">
        <h2 class="text-lg">เลขที่สัญญา</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c1} />
        </div>
      </div>
    </div>
    <div class="form-row two-col right-aligned1">
      <div class="field">
        <h2 class="text-lg">วันที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c2} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>สัญญาฉบับนี้ทำขึ้นระหว่าง</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c3} />
        </div>
      </div>
      <div class="field">
        <h2>อายุ</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c4} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>อยู่บ้านเลขที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c5} />
        </div>
      </div>
      <div class="field">
        <h2>หมู่ที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c6} />
        </div>
      </div>
      <div class="field">
        <h2>ซอย</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c7} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>ถนน</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c8} />
        </div>
      </div>
      <div class="field">
        <h2>ตำบล</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c9} />
        </div>
      </div>
      <div class="field">
        <h2>อำเภอ</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c10} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c11} />
        </div>
      </div>
      <div class="field">
        <h2>ซึ่งต่อไปนี้ เรียกว่า “ผู้ขาย” ฝ่ายหนึ่ง กับ</h2>
      </div>
      <div class="field">
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c12} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>โดยมี</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c13} />
        </div>
      </div>
      <div class="field">
        <h2>เป็นผู้เเทน สำนักงานตั้งอยู่ที่เลขที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c14} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>หมู่ที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c15} />
        </div>
      </div>
      <div class="field">
        <h2>ซอย</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c16} />
        </div>
      </div>
      <div class="field">
        <h2>ถนน</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c17} />
        </div>
      </div>
      <div class="field">
        <h2>ตำบล</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c18} />
        </div>
      </div>
      <div class="field">
        <h2>อำเภอ</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c19} />
        </div>
      </div>
      <div class="field">
        <h2>จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c20} />
        </div>
      </div>
    </div>

    <h2>
      ซึ่งต่อไปนี้เรียกว่า “ผู้ซื้อ” อีกฝ่ายหนึ่ง
      โดยคู่สัญญาทั้งสองฝ่ายตกลงทำสัญญาร่วมกันตามรายละเอียด
      และเงื่อนไขดังต่อไปนี้
    </h2>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๑. วัตถุประสงค์ของสัญญา</h2>
      </div>
    </div>

    <div class="form-row">
      <div class="field">
        <h2>ผู้ซื้อประกอบธุรกิจ</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c21} />
        </div>
        <h2>และผู้ขายมีความประสงค์ที่จะนำข้าวโพด</h2>
      </div>
      <div class="field">
        <h2>
          มาขายให้แก่ผู้ซื้อตามโครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา
          โดยผู้ขายจะเป็น ผู้จัดหาพื้นที่สำหรับเพาะปลูก ดำเนินการเพาะปลูก
          โดยต้นทุนทางด้านระบบชลประทาน กำลังคน และค่าใช้จ่ายในการเพาะปลูก
          เพื่อปฏิบัติตามสัญญาให้ผู้ขายเป็นผู้รับผิดชอบ
        </h2>
      </div>
      <div class="field">
        <h2>
          ผู้ซื้อและผู้ขายตกลงจะให้ความร่วมมือกันอย่างเต็มที่เพื่อผลักดันและส่งเสริมให้การดำเนินการ
          ในโครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา
          บรรลุผลตามวัตถุประสงค์
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๒. ระยะเวลาในการปฏิบัติตามสัญญา</h2>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>สัญญาฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c22} />
        </div>
      </div>
      <div class="field">
        <h2>ถึงวันที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c23} />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๓. รายละเอียดของสถานที่ปลูกข้าวโพด</h2>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <h2>
          สถานที่ตั้งของแปลงข้าวโพดซึ่งผู้ขายใช้ปลูกข้าวโพดเพื่อส่งมอบให้แก่ผู้ซื้อตามสัญญาฉบับนี้มีพื้นที่
        </h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c24} />
        </div>
        <h2>ไร่</h2>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>งาน</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c25} />
        </div>
      </div>
      <div class="field">
        <h2>ตารางวา ตั้งอยู่เลขที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c26} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>หมู่ที่</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c27} />
        </div>
      </div>
      <div class="field">
        <h2>ซอย</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c28} />
        </div>
      </div>
      <div class="field">
        <h2>ถนน</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c29} />
        </div>
      </div>
      <div class="field">
        <h2>ตำบล</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c30} />
        </div>
      </div>
      <div class="field">
        <h2>อำเภอ</h2>
        <div class="dotted-line">
          <input type="text" bind:value={formData.c31} />
        </div>
      </div>
      <div class="field">
        <h2>จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.c32} />
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="field">
        <h2>รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญาฉบับนี้</h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๔. หน้าที่ของคู่สัญญา</h2>
      </div>
      <div class="field">
        <h2>๔.๑ หน้าที่ของผู้ซื้อ</h2>
      </div>
      <div class="field">
        <h2>
          ๑)
          รับซื้อผลผลิตทั้งหมดที่เป็นไปตามมาตรฐานคุณภาพข้าวโพดเลี้ยงสัตว์ของสมาคมผู้ผลิต
          อาหารสัตว์ไทย (ข้าวโพดเลี้ยงสัตว์เบอร์ ๒ ความชื้นไม่เกินร้อยละ ๑๔.๕)
        </h2>
      </div>
      <div class="field">
        <h2>
          ๒) การเข้าไปมีส่วนร่วมในการผลิตที่จำเป็นในการเพาะปลูกให้กับเกษตรกร
          ได้แก่ การจัด ปัจจัยการผลิต การส่งเจ้าหน้าที่ลงแปลงเพื่อตรวจสอบ
          หรือให้คำแนะนำ เป็นต้น ให้คิดมูลค่าโดยอ้างอิงจาก ราคาตลาด ณ
          วันที่ส่งมอบให้แก่เกษตรกร
          พร้อมทั้งแนบรายละเอียดวิธีการคิดราคาที่ชัดเจน
        </h2>
      </div>
      <div class="field">
        <h2>
          ๓)
          จัดเตรียมสถานที่สำหรับรับมอบข้าวโพดจากผู้ขายเพื่อให้ผู้ขายส่งมอบข้าวโพดตามสัญญา
        </h2>
      </div>

      <div class="field">
        <h2>๔.๒ หน้าที่ของผู้ขาย</h2>
      </div>
      <div class="field">
        <h2>
          ๑) ผู้ขายรับรองว่าข้าวโพดที่ตกลงซื้อขายตามสัญญาฉบับนี้
          เป็นข้าวโพดในโครงการสานพลัง
          ประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนา
          และมิได้เป็นข้าวโพดที่ผู้ขายรับซื้อมาจากเกษตรกรรายอื่น
        </h2>
      </div>
      <div class="field">
        <h2>
          ๒) ผู้ขายมีหน้าที่รับผิดชอบ การเตรียมดิน การปลูก
          การกำจัดวัชพืชและศัตรูพืช การเก็บเกี่ยว ระบบชลประทาน และกำลังคน
          เพื่อปฏิบัติตามสัญญา โดยเป็นค่าใช้จ่ายของผู้ขายเอง
        </h2>
      </div>
      <div class="field">
        <h2>
          ๓) ผู้ขายจะต้องส่งมอบผลิตผลทั้งหมดตามวัน เวลา และสถานที่ที่กำหนด
          ให้แก่ผู้ซื้อ แต่เพียงผู้เดียว
          หากผู้ขายไม่ปฏิบัติตามข้อตกลงนี้ไม่ว่าด้วยประการใดๆ
          ย่อมถือว่าผู้ขายผิดสัญญา
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๕. ราคาและวิธีการคำนวณราคาวัตถุดิบและผลิตผลทางการเกษตร</h2>
      </div>
      <div class="field">
        <h2>
          ผู้ขายและผู้ซื้อตกลงราคาซื้อขายข้าวโพดตามราคาตามที่กระทรวงพาณิชย์กำหนด
          โดยคำนวณ น้าหนักข้าวโพดเป็นเมตริกตัน
          รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญา
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๖. การชำระเงิน</h2>
      </div>
      <div class="field">
        <h2>
          ผู้ขายและผู้ซื้อตกลงทำการสรุปราคา ปริมาณและคุณภาพของ
          ข้าวโพดที่ซื้อขายกันตามสัญญานี้ ภายใน ๗ วัน
          นับแต่วันที่ผู้ซื้อได้รับมอบข้าวโพดจากผู้ขาย โดยที่ผู้ซื้อตกลงที่จะช
          าระราคาข้าวโพดให้แก่ผู้ขาย ภายใน ๗ วัน
          นับแต่วันที่ทำการสรุปราคาข้าวโพด
        </h2>
      </div>
      <div class="field">
        <h2>
          ข้อ ๗. เหตุยกเว้นการไม่ปฏิบัติตามสัญญาในกรณีที่เกิดเหตุสุดวิสัย
          หรือเกิดสถานการณ์ที่ไม่สามารถ คาดการณ์หรือหลีกเลี่ยงได้
          และอยู่นอกเหนือการควบคุมของคู่สัญญา
        </h2>
      </div>
      <div class="field">
        <h2>
          ในกรณีที่มีเหตุสุดวิสัยหรือเหตุหนึ่งเหตุใดที่อยู่นอกเหนือการควบคุมของคู่สัญญา
          ได้แก่ อัคคีภัย อุทกภัย วาตภัย และภัยธรรมชาติ เป็นต้น
          อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญา คู่สัญญา
          ทั้งสองฝ่ายจะตกลงร่วมกันในการกำหนดแนวทางแก้ไขปัญหาดังกล่าวเพื่อบรรเทาความเสียหายที่เกิดขึ้น
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>
          ข้อ ๘.
          กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลิตผลทางการเกษตร
        </h2>
      </div>
      <div class="field">
        <h2>
          ผู้ขายและผู้ซื้อตกลงกันให้กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลิตผลทางการเกษตร
          เป็นกรรมสิทธิ์ของผู้ซื้อหรือผู้ขายแล้วแต่กรณี
          โดยให้พิจารณาว่าผู้ขายหรือผู้ซื้อเป็นผู้จัดหาทรัพย์สินดังกล่าว
          เพื่อนำมาใช้ในการผลิต
        </h2>
      </div>
      <div class="field">
        <h2>
          ข้อ ๙. ผู้รับความเสี่ยงภัยในผลิตผลทางการเกษตร
          และความเสี่ยงทางการค้าในกรณีที่ผลิตผลทางการ
          เกษตรไม่สามารถจำหน่ายได้ตามราคาที่กำหนดไว
        </h2>
      </div>
      <div class="field">
        <h2>
          ๑)
          ในระหว่างการปลูกหากเกิดโรคระบาดและเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติ
          ตามสัญญาข้อใดข้อหนึ่งได้
          ให้คู่สัญญาตกลงร่วมกันเพื่อบรรเทาความเสียหายที่เกิดขึ้น เว้นแต่กรณีที่
          โรคระบาดนั้นเกิดจากความผิดของผู้ขาย
          ผู้ขายจะต้องรับภาระในความเสียหายที่เกิดขึ้น
        </h2>
      </div>
      <div class="field">
        <h2>
          ๒)
          ในกรณีที่ผลิตผลทางการเกษตรไม่สามารถจำหน่ายได้ตามราคาที่กำหนดไว้ผู้ซื้อตกลง
          ที่จะรับซื้อข้าวโพดตามโครงการสานพลังประชารัฐเพื่อสนับสนุนการปลูกข้าวโพดหลังฤดูทำนาทั้งหมด
          ตามราคาที่ตกลงไว้ในข้อ ๕. โดยไม่มีการเปลี่ยนแปลง
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๑๐. การเยียวยาความเสียหายจากการผิดสัญญา</h2>
      </div>
      <div class="field">
        <h2>
          ในกรณีที่เกิดความเสียหายจากคู่สัญญาที่ไม่สามารถปฏิบัติตามสัญญา
          คู่สัญญาฝ่ายที่ก่อให้เกิดความ เสียหายยินยอมที่จะชำระค่าปรับให้แก่คู่
        </h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2>สัญญาอีกฝ่ายหนึ่งในอัตรา</h2>
          <div class="dotted-line">
            <input type="text" placeholder="" bind:value={formData.c33} />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2>ข้อ ๑๑. สิทธิในการบอกเลิกสัญญาของคู่สัญญา</h2>
      </div>
      <div class="field">
        <h2>
          หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งไม่ปฏิบัติตามข้อตกลงในสัญญาไม่ว่าข้อใดข้อหนึ่ง
          หรือหลายข้อรวมกัน
          คู่สัญญาอีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญาและเรียกค่าเสียหายได้ทันที
          และให้ถือว่าสัญญาสิ้นสุดลง
        </h2>
      </div>
      <div class="field">
        <h2>
          สัญญาฉบับนี้ทำขึ้นสองฉบับ มีข้อความถูกต้องตรงกัน
          คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความ ในสัญญานี้ดีแล้ว
          และเห็นว่าเป็นไปตามเจตนาของตน จึงลงลายมือชื่อไว้ต่อหน้าพยานเป็นสำคัญ ณ
          วัน เดือน ปี ตามที่ระบุไว้ข้างต้น โดยคู่สัญญาต่างยึดถือไว้ฝ่ายละฉบับ
        </h2>
      </div>
    </div>
    <div class="button-container flex space-x-4">
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
</div>

<style>
  button {
    margin: auto;
    display: block;
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
  .form-row.right-aligned1 {
    display: flex;
    justify-content: flex-end; /* จัดตำแหน่งให้ฟอร์มไปที่ขวา */
    align-items: center; /* จัดตำแหน่งให้ label, dotted line, input อยู่ในแนวเดียวกัน */
    gap: 10px; /* เพิ่มระยะห่างระหว่างแต่ละฟิลด์ */
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 20px;
    }

    .two-col {
      grid-template-columns: 1fr;
    }

    .three-col {
      grid-template-columns: 1fr;
    }

    .field {
      flex-direction: column;
      align-items: flex-start;
    }

    .dotted-line {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 10px;
    }

    .title h1,
    .title h2 {
      font-size: 1.5rem;
    }

    input[type="text"] {
      font-size: 0.9rem;
    }

    button {
      font-size: 0.9rem;
      padding: 8px 12px;
    }
  }
</style>
