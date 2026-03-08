<script>
  import { onMount } from "svelte";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import Toast from "$lib/components/Toast.svelte";
  import { addToast } from "$lib/stores/toastStore";

  const BACKEND_API = import.meta.env.VITE_BACKEND_API; 
  const initialFormData = {
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    f6: "",
    f7: "",
    f8: "",
    f9: "",
    f10: "",
    f11: "",
    f12: "",
    f13: "",
    f14: "",
    f15: "",
    f16: "",
    f17: "",
    f18: "",
    f19: "",
    f20: "",
    f21: "",
    f22: "",
    f23: "",
    f24: "",
    f25: "",
    f26: "",
    f27: "",
    f28: "",
    f29: "",
    f30: "",
    f31: "",
    f32: "",
    f33: "",
    f34: "",
    f35: "",
    f36: "",
    f37: "",
    f38: "",
    f39: "",
    f40: "",
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

    const response = await fetch(`${BACKEND_API}/document/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        document_type_id: 1,
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

  function resetFormData() {
    formData = structuredClone(initialFormData);
    addToast("ล้างฟอร์มสำเร็จ", "success");
  }

  function generatePDF() {
    const doc = new jsPDF();

    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew", "normal");

    doc.setFontSize(18);
    doc.text(`สัญญาซื้อขาย ${formData.f1}`, 105, 35, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("เลขที่สัญญา..............................", 20, 22);
    doc.text(`${formData.f2}`, 38, 21);
    doc.text("ทำที่...............................", 147, 44);
    doc.text(`${formData.f3}`, 155, 43);
    doc.text("วันที่.......................................", 165, 54, {
      align: "center",
    });
    doc.text(`${formData.f4}`, 155, 53);

    doc.setFontSize(14);
    doc.text(
      "สัญญาฉบับนี้ทำขึ้นระหว่าง.....................................................................อายุ................................อยู่บ้านเลขที่............................",
      25,
      69
    );
    doc.text(`${formData.f5}`, 61, 68);
    doc.text(`${formData.f6}`, 123, 68);
    doc.text(`${formData.f7}`, 165, 68);

    doc.text(
      "หมู่ที่......................ซอย......................ถนน..............................ตำบล..............................อำเภอ..............................",
      20,
      76
    );
    doc.text(`${formData.f8}`, 28, 75);
    doc.text(`${formData.f9}`, 50, 75);
    doc.text(`${formData.f10}`, 74, 75);
    doc.text(`${formData.f11}`, 106, 75);
    doc.text(`${formData.f12}`, 138, 75);

    doc.text(
      "จังหวัด............................ซึ่งต่อไปนี้ เรียกว่า “ผู้ขาย” ฝ่ายหนึ่ง กับ....................................................................................",
      20,
      83
    );
    doc.text(`${formData.f13}`, 30, 82);
    doc.text(`${formData.f14}`, 105, 82);

    doc.text(
      "โดยมี........................................................................................เป็นผู้เเทน",
      20,
      90
    );
    doc.text(`${formData.f15}`, 30, 89);

    doc.text(
      "สํานักงานตั้งอยู่ที่เลขที่.......................หมู่ที่.......................ซอย......................ถนน.......................ตำบล..........................",
      20,
      97
    );
    doc.text(`${formData.f16}`, 50, 96);
    doc.text(`${formData.f17}`, 74, 96);
    doc.text(`${formData.f18}`, 99, 96);
    doc.text(`${formData.f19}`, 122, 96);
    doc.text(`${formData.f20}`, 148, 96);

    doc.text(
      "อำเภอ..............................จังหวัด..............................",
      20,
      104
    );
    doc.text(`${formData.f21}`, 30, 103);
    doc.text(`${formData.f22}`, 63, 103);

    doc.text(
      "ซึ่งต่อไปนี้เรียกว่า “ผู้ซื้อ” อีกฝ่ายหนึ่ง โดยคู่สัญญาทั้งสองฝ่ายตกลงทําสัญญาร่วมกันตามรายละเอียด และเงื่อนไขดังต่อไปนี้",
      20,
      111
    );

    doc.text("ข้อ ๑. วัตถุประสงค์ของสัญญา ", 20, 118);
    doc.text(
      "ผู้ซื้อประกอบธุรกิจ(ผลผลิตทางการเกษตร)และผู้ขายมีความประสงค์ที่จะนํา(ผลผลิตทางการเกษตร)",
      25,
      125
    );
    doc.text(
      "มาขายให้แก่ผู้ซื้อ โดยผู้ขายจะเป็นผู้จัดหาพื้นที่สําหรับเพาะปลูกดําเนินการเพาะปลูกโดยต้นทุนทางด้านระบบชลประทาน",
      20,
      132
    );
    doc.text(
      "กําลังคน และค่าใช้จ่ายในการเพาะปลูก เพื่อปฏิบัติตามสัญญาให้ผู้ขายเป็นผู้รับผิดชอบ",
      20,
      139
    );
    doc.text(
      "ผู้ซื้อและผู้ขายตกลงจะให้ความร่วมมือกันอย่างเต็มที่เพื่อผลักดันและส่งเสริมให้บรรลุผล ตามวัตถุประสงค์ของสัญญา",
      25,
      146
    );

    doc.text("ข้อ ๒) ระยะเวลาในการปฏิบัติตามสัญญา", 20, 153);
    doc.text(
      "สัญญาฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่..................................................ถึงวันที่.............................................",
      25,
      160
    );
    doc.text(`${formData.f23}`, 74, 159);
    doc.text(`${formData.f24}`, 126, 159);

    doc.text("ข้อ ๓) รายละเอียดของสถานที่ปลูก", 20, 167);
    doc.text(
      "สถานที่ตั้งของ............................................................ซึ่งผู้ซื้อขายใช้เพาะปลูกเพื่อสงมอบให้แกผู้ซื้อตามสัญญาฉบับนี้มีพื้นที่",
      25,
      174
    );
    doc.text(`${formData.f25}`, 45, 173);
    doc.text(
      "มีพื้นที่..............................ไร่..............................งาน..............................ตารางวา",
      20,
      181
    );
    doc.text(`${formData.f26}`, 30, 180);
    doc.text(`${formData.f27}`, 56, 180);
    doc.text(`${formData.f28}`, 85, 180);
    doc.text(
      "ตั้งอยู่..............................เลขที่..............................หมู่ที่..............................ซอย..............................",
      20,
      188
    );
    doc.text(`${formData.f29}`, 28, 187);
    doc.text(`${formData.f30}`, 59, 187);
    doc.text(`${formData.f31}`, 89, 187);
    doc.text(`${formData.f32}`, 118, 187);
    doc.text(
      "ตำบล..............................อำเภอ..............................จังหวัด.............................รายละเอียดปรากฏตามเอกสารแนบที่สัญญาฉบับนี้",
      20,
      195
    );
    doc.text(`${formData.f33}`, 29, 194);
    doc.text(`${formData.f34}`, 61, 194);
    doc.text(`${formData.f35}`, 94, 194);

    doc.text("๑", 100, 245);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสม ทั้งนี้ให้เป็นไปตามมาตรา ๒๖ แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบ",
      25,
      255
    );
    doc.text("เกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 262);
    doc.text("**ข้อมูล ณ วันที่ ๕ ตุลาคม ๒๕๖๑", 25, 269);

    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("สัญญาเลขที่.....................", 20, 22);
    doc.text(`${formData.f2}`, 38, 21);
    doc.text("ข้อ ๔. หน้าที่ของคู่สัญญา", 20, 35);
    doc.text("๔.๑ หน้าที่ของผู้ซื้อ", 25, 42);
    doc.text(
      "๑) อํานวยความสะดวก ส่งเสริม และสนับสนุนดานวิชาการเกี่ยวกับการเพาะปลูกอย่างเต็มที่ ให้แกผู้ขาย ",
      30,
      49
    );
    doc.text(
      "ซึ่งการสนับสนุนดังกล่าวครอบคลุมถึงการให้ความรู้ และการให้คําปรึกษาแนะนํา",
      30,
      56
    );
    doc.text(
      "๒) รับซื้อผลผลิตทั้งหมดที่ผ่านเกณฑ์ตามที่ระบุไว้ในเอกสารแนบท้ายสัญญานี้",
      30,
      63
    );
    doc.text(
      "๓) จัดหาวัสดุต่างๆ ที่จําเป็นในการเพาะปลูกให้กับเกษตรกร โดยคิดมูลค่าตามราคาตลาด",
      30,
      70
    );
    doc.text(
      "๔) จัดเตรียมสถานที่สําหรับรับมอบผลผลิตทางการเกษตรจากผู้ขาย เพื่อให้ผู้ขายส่งมอบ ผลผลิตทางการเกษตรตามสัญญา",
      30,
      77
    );

    doc.text("๔.๒ หน้าที่ของผู้ขาย", 25, 84);
    doc.text(
      "๑) ผู้ขายมีหน้าที่รับผิดชอบ การเตรียมดิน การปลูก การกําจัดวัชพืชและศัตรูพืช การเก็บเกี่ยว ระบบชลประทาน และกําลังคน เพื่อ",
      30,
      91
    );
    doc.text("ปฏิบัติตามสัญญา โดยเป็นค่าใช้จ่ายของผู้ขายเอง", 30, 98);
    doc.text(
      "๒) ผู้ขายต้องเชื่อฟังและปฏิบัติตามคําแนะนําของนักวิชาการ หรือเจ้าหน้าที่ของผู้ซื้อ โดยยินยอมให้เจ้าหน้าที่ของผู้ซื้อเข้าในพื้นที่เพาะ",
      30,
      105
    );
    doc.text(
      "ปลูกผลผลิตทางการเกษตรเพื่อช่วยเหลือสนับสนุน ในการเพาะปลูก ในเวลาปฏิบัติงานตามปกติ",
      30,
      112
    );
    doc.text(
      "๓) ผู้ขายต้องส่งมอบผลิตผลทั้งหมดตามวัน เวลา และสถานที่ที่กำหนดให้แก่ผู้ซื้อแต่เพียงผู้เดียว หากผู้ขายไม่ปฏิบัติตามข้อตกลงนี้",
      30,
      119
    );
    doc.text("ไม่ว่าด้วยประการใดๆ ย่อมถือว่าผู้ขายมีเจตนาทุจริต", 30, 126);

    doc.text(
      "ข้อ ๕) ราคาและวิธีการคํานวณราคาวัตถุดิบและผลิตผลทางการเกษตร",
      20,
      133
    );
    doc.text(
      "ผู้ขายและผู้ซื้อตกลงราคาซื้อขายข้าวโพดตามราคาที่.............................................................................................",
      25,
      140
    );
    doc.text(`${formData.f36}`, 92, 139);
    doc.text(
      "โดยคำนวณน้ำหนักผลผลิตทางการเกษตรเป็นเมตริกตัน รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญา",
      20,
      147
    );

    doc.text("ข้อ ๖) การชำระเงิน", 20, 154);
    doc.text(
      "ผู้ขายและผู้ซื้อตกลงทำการสรุปราคาค่าผลผลิตทางการเกษตรที่ซื้อขายกันตามสัญญานี้..................................................................................",
      25,
      161
    );
    doc.text(`${formData.f37}`, 136, 160);

    doc.text(
      "ข้อ ๗) เหตุยกเว้นการไม่ปฏิบัติตามสัญญาในกรณีที่เกิดเหตุสุดวิสัย หรือเกิดสถานการณ์ที่ไม่สามารถคาดการณ์หรือหลีกเลี่ยงได้",
      20,
      168
    );
    doc.text("และอยู่นอกเหนือการควบคุมของคู่สัญญา", 20, 175);
    doc.text(
      "ในกรณีที่มีเหตุสุดวิสัยหรือเหตุหนึ่งเหตุใดที่อยู่นอกเหนือการควบคุมของคู่สัญญา ได้แก่ อัคคีภัย อุทกภัย วาตภัย ภัยธรรมชาติ หรือ",
      25,
      182
    );
    doc.text(
      "โรคระบาด เป็นต้น อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญา คู่สัญญาทั้งสองฝ่ายจะตกลงร่วมกันในการกำหนดแนวทาง",
      20,
      189
    );
    doc.text("แก้ไขปัญหาดังกล่าวเพื่อบรรเทาความเสียหายที่เกิดขึ้น", 20, 196);

    doc.text("๒", 100, 245);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสม ทั้งนี้ให้เป็นไปตามมาตรา ๒๖ แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบ",
      25,
      255
    );
    doc.text("เกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 262);
    doc.text("**ข้อมูล ณ วันที่ ๕ ตุลาคม ๒๕๖๑", 25, 269);

    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("สัญญาเลขที่.....................", 20, 22);
    doc.text(`${formData.f2}`, 38, 21);
    doc.text(
      "ข้อ ๘) กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลผลิตทางการเกษตร",
      20,
      35
    );
    doc.text(
      "ผู้ขายและผู้ซื้อตกลงกันให้กรรมสิทธิ์ในผลผลิตทางการเกษตรตามปริมาณผลผลิตที่ปลูกบนพื้นที่เพาะปลูกตามข้อ 3 โอนไปยังผู้ซื้อ",
      25,
      42
    );
    doc.text(
      "นับแต่..........................................................................................................................",
      20,
      49
    );
    doc.text(`${formData.f38}`, 28, 48);
    doc.text(
      "ข้อ ๙) ผู้รับความเสี่ยงภัยในผลผลิตทางการเกษตรและความเสี่ยงทางการค้าในกรณีที่ผลผลิตทางการเกษตรไม่สามารถจำหน่ายได้",
      20,
      56
    );
    doc.text("ตามราคาที่กำหนดไว้", 20, 63);
    doc.text(
      ".........................................................................................................................................................................",
      25,
      70
    );
    doc.text(
      ".........................................................................................................................................................................",
      20,
      77
    );
    doc.text(`${formData.f39}`, 28, 69);

    doc.text("ข้อ ๑๐) การเยียวยาความเสียหายจากการผิดสัญญา", 20, 84);
    doc.text(
      "ในกรณีที่เกิดความเสียหายจากคู่สัญญาที่ไม่สามารถปฏิบัติตามสัญญา คู่สัญญาฝ่ายที่ก่อให้เกิดความเสียหายยินยอมที่จะชำระค่า",
      25,
      91
    );
    doc.text(
      "ปรับให้แก่คู่สัญญาอีกฝ่ายหนึ่งในอัตรา..........................................................................................................................",
      20,
      98
    );
    doc.text(`${formData.f40}`, 70, 97);

    doc.text("ข้อ ๑๑) สิทธิในการบอกเลิกสัญญาของคู่สัญญา", 20, 105);
    doc.text(
      "หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งไม่ปฏิบัติตามข้อตกลงในสัญญาไม่ว่าข้อใดข้อหนึ่งหรือหลายข้อรวมกัน คู่สัญญาอีกฝ่ายหนึ่งมีสิทธิ",
      25,
      112
    );
    doc.text(
      "บอกเลิกสัญญาและเรียกค่าเสียหายได้ทันที และให้ถือว่าสัญญาสิ้นสุดลง",
      20,
      119
    );
    doc.text(
      "สัญญาฉบับนี้ทำขึ้นสองฉบับ มีข้อความถูกต้องตรงกัน คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญานี้ดีแล้ว และเห็นว่า",
      25,
      126
    );
    doc.text(
      "เป็นไปตามเจตนาของตน จึงลงลายมือชื่อไว้ต่อหน้าพยานเป็นสำคัญ ณ วัน เดือน ปี ตามที่ระบุไว้ข้างต้น โดยคู่สัญญาต่างยึดถือไว้",
      20,
      133
    );
    doc.text("ฝ่ายละฉบับ", 20, 140);

    doc.text(
      `ลงชื่อ.......................................เกษตรกร                      ลงชื่อ.......................................ผู้ประกอบธุรกิจทางการเกษตร`,
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

    doc.text("๓", 100, 245);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text(
      "*รายละเอียดของสัญญาสามารถปรับแก้ได้ตามความเหมาะสม ทั้งนี้ให้เป็นไปตามมาตรา ๒๖ แห่งพระราชบัญญัติส่งเสริมและพัฒนาระบบ",
      25,
      255
    );
    doc.text("เกษตรพันธสัญญา พ.ศ. ๒๕๖๐", 25, 262);
    doc.text("**ข้อมูล ณ วันที่ ๕ ตุลาคม ๒๕๖๑", 25, 269);

    doc.save("สัญญาซื้อขาย.pdf");
    addToast("ดาวน์โหลดไฟล์สำเร็จ", "success");
  }

  function ClickData() {
    if (!formData.f1) {
      addToast("กรุณากรอกข้อมูลผลผลิตทางการเกษตร", "warning");
      return false;
    } else if (!formData.f2 || !formData.f3 || !formData.f4) {
      addToast("กรุณากรอกข้อมูลสัญญา ทำที่ และวันที่", "warning");
      return false;
    } else if (
      !formData.f5 ||
      !formData.f6 ||
      !formData.f7 ||
      !formData.f8 ||
      !formData.f9 ||
      !formData.f10 ||
      !formData.f11 ||
      !formData.f12 ||
      !formData.f13 ||
      !formData.f14 ||
      !formData.f15 ||
      !formData.f16 ||
      !formData.f17 ||
      !formData.f18 ||
      !formData.f19 ||
      !formData.f20 ||
      !formData.f21 ||
      !formData.f22 ||
      !formData.f23 ||
      !formData.f24 ||
      !formData.f25 ||
      !formData.f26 ||
      !formData.f27 ||
      !formData.f28 ||
      !formData.f29 ||
      !formData.f30 ||
      !formData.f31 ||
      !formData.f32 ||
      !formData.f33 ||
      !formData.f34 ||
      !formData.f35 ||
      !formData.f36 ||
      !formData.f37 ||
      !formData.f38 ||
      !formData.f39 ||
      !formData.f40
    ) {
      addToast("กรุณากรอกข้อมูลให้ครบ", "warning");
      return false;
    }
    return true; // คืนค่า true หากข้อมูลถูกต้อง
  }
</script>

<div class="form-container">
  <Toast />
  <div class="header">
    <div class="title text-center">
      <h1 class="text-2xl font-bold">สัญญาซื้อขาย</h1>
      <input
        type="text"
        placeholder="(ผลผลิตทางการเกษตร)"
        class="text-2xl mt-2 border p-2 text-center"
        bind:value={formData.f1}
      />
    </div>
  </div>
  <div class="form-row two-col right-aligned1">
    <div class="field">
      <h2 class="text-lg">เลขที่สัญญา</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f2} />
      </div>
    </div>
  </div>
  <div class="form-row two-col right-aligned1">
    <div class="field">
      <h2 class="text-lg">ทำที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f3} />
      </div>
    </div>
  </div>

  <form>
    <div class="form-row two-col">
      <div class="field">
        <h2>วันที่</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="1 มกราคม 2555"
            bind:value={formData.f4}
          />
        </div>
      </div>
    </div>

    <div class="field">
      <h2>สัญญาฉบับนี้ทำขึ้นระหว่าง</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f5} />
      </div>
    </div>
    <div class="field">
      <h2>อายุ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f6} />
      </div>
    </div>
    <div class="field">
      <h2>อยู่บ้านเลขที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f7} />
      </div>
      <h2>หมู่ที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f8} />
      </div>
      <h2>ซอย</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f9} />
      </div>
    </div>
    <div class="field">
      <h2>ถนม</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f10} />
      </div>
      <h2>ตําบล</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f11} />
      </div>
      <h2>อําเภอ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f12} />
      </div>
    </div>
    <div class="field">
      <h2>จังหวัด</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f13} />
      </div>
      <h2>ซึ่งต่อไปนี้ เรียกว่า “ผู้ขาย” ฝ่ายหนึ่ง กับ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f14} />
      </div>
    </div>
    <div class="field">
      <h2>โดยมี</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f15} />
      </div>
      <h2>เป็นผู้แทน</h2>
    </div>
    <div class="field">
      <h2>สำหนักงานตั้งอยู่ที่เลขที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f16} />
      </div>
      <h2>หมู่ที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f17} />
      </div>
      <h2>ซอย</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f18} />
      </div>
    </div>
    <div class="field">
      <h2>ถนม</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f19} />
      </div>
      <h2>ตําบล</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f20} />
      </div>
      <h2>อําเภอ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f21} />
      </div>
    </div>
    <div class="form-row three-col">
      <div class="field">
        <h2>จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.f22} />
        </div>
      </div>
    </div>
    <h2>
      ซึ่งต่อไปนี้เรียกว่า “ผู้ซื้อ” อีกฝ่ายหนึ่ง
      โดยคู่สัญญาทั้งสองฝ่ายตกลงทำสัญญาร่วมกันตามรายละเอียด
      และเงื่อนไขดังต่อไปนี้
    </h2>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">ข้อ ๑) วัตถุประสงค์ของสัญญา</h1>
      <h2 class="text-lg">
        ผู้ซื้อประกอบธุรกิจ {formData.f1} และผู้ขายมีความประสงค์ที่จะนํา
        {formData.f1} มาขายให้ผู้ซื้อ โดยผู้ขายจะเป็นผู้จัดหาพื้นที่สําหรับเพาะปลูก
        ดําเนินการเพาะปลูก โดยต้นทุนทางดานระบบชลประทาน กําลังคน และค่าใช้จ่ายในการเพาะปลูก
        เพื่อปฏิบัติตามสัญญาให้ผู้ซื้อขายเป็นผู้รับผิดชอบ
      </h2>
      <h2 class="text-lg">
        ผู้ซื้อและผู้ขายตกลงจะให้ความร่วมมือกันอย่างเต็มที่เพื่อผลักดันและสงเสริมให้บรรลุผล
        ตามวัตถุประสงค์ของสัญญา
      </h2>
    </div>

    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">ข้อ ๒) ระยะเวลาในการปฏิบัติตามสัญญา</h1>
    </div>
    <div class="form-row gap-4">
      <div class="field">
        <h2 class="text-lg">สัญญาฉบับนี้มีผลบังคับใช้ตั้งแต่วันที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.f23} />
        </div>
        <h2 class="text-lg">ถึงวันที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.f24} />
        </div>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๓) รายละเอียดของสถานที่ปลูก {formData.f1}
      </h1>
    </div>

    <div class="field">
      <h2 class="text-lg">สถานที่ตั้งของ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f25} />
      </div>
      <h2 class="text-lg">
        ซึ่งผู้ซื้อขายใช้เพาะปลูกเพื่อสงมอบให้แกผู้ซื้อตามสัญญาฉบับนี้
      </h2>
    </div>
    <div class="field">
      <h2 class="text-lg">มีพื้นที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f26} />
      </div>
      <h2 class="text-lg">ไร่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f27} />
      </div>
      <h2 class="text-lg">งาน</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f28} />
      </div>
      <h2 class="text-lg">ตารางวา</h2>
    </div>

    <div class="field">
      <h2 class="text-lg">ตั้งอยู่เลขที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f29} />
      </div>
      <h2 class="text-lg">หมู่ที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f30} />
      </div>
      <h2 class="text-lg">ซอย</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f31} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">ถนน</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f32} />
      </div>
      <h2 class="text-lg">ตำบล</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f33} />
      </div>
      <h2 class="text-lg">อําเภอ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f34} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">จังหวัด</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.f35} />
      </div>
      <h2 class="text-lg">รายละเอียดปรากฏตามเอกสารแนบที่สัญญาฉบับนี้</h2>
    </div>
  </form>

  <form>
    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">ข้อ ๔) หน้าที่ของคู่สัญญา</h1>
    </div>

    <div class="field">
      <h2 class="text-lg font-bold">๔.๑ หน้าที่ของผู้ซื้อ</h2>
    </div>
    <div class="flex flex-col py-4">
      <h2 class="text-lg">
        ๑) อํานวยความสะดวก ส่งเสริม
        และสนับสนุนดานวิชาการเกี่ยวกับการเพาะปลูกอย่างเต็มที่ ให้แกผู้ขาย
        ซึ่งการสนับสนุนดังกล่าวครอบคลุมถึงการใหความรู้ และการให้คําปรึกษาแนะนํา
      </h2>
      <h2 class="text-lg">
        ๒) รับซื้อผลผลิตทั้งหมดที่ผ่านเกณฑ์ตามที่ระบุไว้ในเอกสารแนบท้ายสัญญานี้
      </h2>
      <h2 class="text-lg">
        ๓) จัดหาวัสดุต่างๆ ที่จําเป็นในการเพาะปลูกให้กับเกษตรกร
        โดยคิดมูลค่าตามราคาตลาด
      </h2>
      <h2 class="text-lg">
        ๔) จัดเตรียมสถานที่สําหรับรับมอบผลผลิตทางการเกษตรจากผู้ขาย
        เพื่อให้ผู้ขายส่งมอบ ผลผลิตทางการเกษตรตามสัญญา
      </h2>
    </div>
    <div class="field">
      <h2 class="text-lg font-bold">๔.๒ หน้าที่ของผู้ขาย</h2>
    </div>
    <div class="flex flex-col py-4">
      <h2 class="text-lg">
        ๑) ผู้ขายมีหน้าที่รับผิดชอบ การเตรียมดิน การปลูก
        การกําจัดวัชพืชและศัตรูพืช การเก็บเกี่ยว ระบบชลประทาน และกําลังคน
        เพื่อปฏิบัติตามสัญญา โดยเป็นค่าใช้จ่ายของผู้ขายเอง
      </h2>
      <h2 class="text-lg">
        ๒) ผู้ขายต้องเชื่อฟังและปฏิบัติตามคําแนะนําของนักวิชาการ
        หรือเจ้าหน้าที่ของผู้ซื้อ
        โดยยินยอมให้เจ้าหน้าที่ของผู้ซื้อเข้าในพื้นที่เพาะปลูกผลผลิตทางการเกษตรเพื่อช่วยเหลือสนับสนุน
        ในการเพาะปลูก ในเวลาปฏิบัติงานตามปกติ
      </h2>
      <h2 class="text-lg">
        ๓) ผู้ขายต้องส่งมอบผลิตผลทั้งหมดตามวัน เวลา
        และสถานที่ที่กำหนดให้แก่ผู้ซื้อแต่เพียงผู้เดียว
        หากผู้ขายไม่ปฏิบัติตามข้อตกลงนี้ไม่ว่าด้วยประการใดๆ
        ย่อมถือว่าผู้ขายมีเจตนาทุจริต
      </h2>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๕) ราคาและวิธีการคํานวณราคาวัตถุดิบและผลิตผลทางการเกษตร
      </h1>
      <div class="field">
        <h2 class="text-lg">
          ผู้ขายและผู้ซื้อตกลงราคาซื้อขายข้าวโพดตามราคาที่
        </h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="(กระทรวงพาณิชย์กำหนด / ราคาตลาด ณ วันที่ทำสัญญา)"
            class="text-lg"
            bind:value={formData.f36}
          />
        </div>
      </div>
      <h2 class="text-lg">
        โดยคำนวณน้ำหนักผลผลิตทางการเกษตรเป็นเมตริกตัน
        รายละเอียดปรากฏตามเอกสารแนบท้ายสัญญา
      </h2>

      <h1 class="text-lg font-bold">ข้อ ๖) การชำระเงิน</h1>
      <h2 class="text-lg">
        ผู้ขายและผู้ซื้อตกลงทำการสรุปราคาค่าผลผลิตทางการเกษตรที่ซื้อขายกันตามสัญญานี้
      </h2>
      <div class="dotted-line">
        <input
          type="text"
          placeholder="(โดยต้องระบุให้ชัดเจนว่าชำระเงินก่อนส่งมอบ ในวันส่งมอบ หรือภายในกี่วันนับแต่วันที่ส่งมอบ)"
          class="text-lg"
          bind:value={formData.f37}
        />
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๗) เหตุยกเว้นการไม่ปฏิบัติตามสัญญาในกรณีที่เกิดเหตุสุดวิสัย
        หรือเกิดสถานการณ์ที่ไม่สามารถคาดการณ์หรือหลีกเลี่ยงได้
        และอยู่นอกเหนือการควบคุมของคู่สัญญา
      </h1>
      <h2 class="text-lg">
        ในกรณีที่มีเหตุสุดวิสัยหรือเหตุหนึ่งเหตุใดที่อยู่นอกเหนือการควบคุมของคู่สัญญา
        ได้แก่ อัคคีภัย อุทกภัย วาตภัย ภัยธรรมชาติ หรือโรคระบาด เป็นต้น
        อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญา
        คู่สัญญาทั้งสองฝ่ายจะตกลงร่วมกันในการกำหนดแนวทางแก้ไขปัญหาดังกล่าวเพื่อบรรเทาความเสียหายที่เกิดขึ้น
      </h2>

      <h1 class="text-lg font-bold">
        ข้อ ๘)
        กรรมสิทธิ์ในทรัพย์สินที่เกี่ยวข้องในขั้นตอนของการผลิตผลผลิตทางการเกษตร
      </h1>
      <div class="field">
        <h2 class="text-lg">
          ผู้ขายและผู้ซื้อตกลงกันให้กรรมสิทธิ์ในผลผลิตทางการเกษตรตามปริมาณผลผลิตที่ปลูกบนพื้นที่เพาะปลูกตามข้อ
          3 โอนไปยังผู้ซื้อ
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">นับแต่</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="(วันที่ทั้งสองฝ่ายตกลงยืนยันแปลงเพาะปลูกที่จะรับซื้อ)"
            bind:value={formData.f38}
          />
        </div>
      </div>
      <h1 class="text-lg font-bold">
        ข้อ ๙)
        ผู้รับความเสี่ยงภัยในผลผลิตทางการเกษตรและความเสี่ยงทางการค้าในกรณีที่ผลผลิตทางการเกษตรไม่สามารถจำหน่ายได้ตามราคาที่กำหนดไว้
      </h1>
      <div class="dotted-line">
        <textarea
          placeholder="(ให้คู่สัญญาตกลงเกี่ยวกับความเสี่ยงภัยที่อาจเกิดขึ้น โดยระบุถึงรายละเอียดที่คู่สัญญาทั้งสองฝ่ายจะต้องรับผิดชอบในความเสียหายที่อาจเกิดขึ้นระหว่างการปฏิบัติตามสัญญา)"
          bind:value={formData.f39}
          rows="4"
          class="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>

      <h1 class="text-lg font-bold">
        ข้อ ๑๐) การเยียวยาความเสียหายจากการผิดสัญญา
      </h1>
      <div class="field">
        <h2 class="text-lg">
          ในกรณีที่เกิดความเสียหายจากคู่สัญญาที่ไม่สามารถปฏิบัติตามสัญญา
          คู่สัญญาฝ่ายที่ก่อให้เกิดความเสียหายยินยอมที่จะชำระค่า
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">ปรับให้แก่คู่สัญญาอีกฝ่ายหนึ่งในอัตรา</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.f40} />
        </div>
      </div>
      <h1 class="text-lg font-bold">
        ข้อ ๑๑) สิทธิในการบอกเลิกสัญญาของคู่สัญญา
      </h1>
      <div class="field">
        <h2 class="text-lg">
          หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งไม่ปฏิบัติตามข้อตกลงในสัญญาไม่ว่าข้อใดข้อหนึ่งหรือหลายข้อรวมกัน
          คู่สัญญาอีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญาและเรียกค่าเสียหายได้ทันที
          และให้ถือว่าสัญญาสิ้นสุดลง
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          สัญญาฉบับนี้ทำขึ้นสองฉบับ มีข้อความถูกต้องตรงกัน
          คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญานี้ดีแล้ว
          และเห็นว่าเป็นไปตามเจตนาของตน จึงลงลายมือชื่อไว้ต่อหน้าพยานเป็นสำคัญ ณ
          วัน เดือน ปี ตามที่ระบุไว้ข้างต้น โดยคู่สัญญาต่างยึดถือไว้ฝ่ายละฉบับ
        </h2>
      </div>
    </div>
  </form>
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

  .form-number {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
    border: 1px solid #000;
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

  input[type="text"],
  input[type="date"] {
    width: 100%;
    border: none;
    background: transparent;
    padding: 5px 0;
    font-family: "Sarabun", sans-serif;
  }

  input[type="text"]:focus,
  input[type="date"]:focus {
    outline: none;
  }

  .fixed-text {
    position: absolute;
    left: 0;
    bottom: 5px;
  }

  .checkbox-group {
    margin: 10px 0;
    padding-left: 20px;
  }

  .checkbox-group label {
    display: block;
    margin: 5px 0;
  }

  .inline-input {
    width: 200px;
    margin-left: 10px;
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

  .center-text {
    text-align: center;
  }

  .form-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
  }

  .form-actions button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .form-actions button:hover {
    opacity: 0.9;
  }

  .department-input {
    position: relative;
  }

  .department-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .department-option {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .department-option:hover {
    background-color: #f0f0f0;
  }

  .researcher-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .researcher-option {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .researcher-option:hover {
    background-color: #f0f0f0;
  }

  select {
    width: 100%;
    padding: 8px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1em;
    cursor: pointer;
  }

  select option {
    background: white;
    color: #333;
    padding: 8px;
  }

  .researcher-input {
    position: relative;
  }

  .researcher-field-group {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .researcher-field-group select {
    width: 150px;
    flex-shrink: 0;
  }

  .researcher-field-group input {
    flex: 1;
  }

  .upload-container {
    position: relative;
    width: 100%;
  }

  .custom-file-upload {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .choose-file-btn {
    display: inline-block;
    padding: 6px 12px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .choose-file-btn:hover {
    background-color: #0056b3;
  }

  .file-name {
    color: #333;
    word-break: break-all;
  }

  .no-file {
    color: #666;
  }

  .upload-input {
    display: none;
  }

  .form-row.right-aligned {
    display: flex;
    justify-content: flex-end; /* จัดตำแหน่งให้ฟอร์มไปที่ขวา */
    align-items: center; /* จัดตำแหน่งให้ label, dotted line, input อยู่ในแนวเดียวกัน */
    gap: 10px; /* เพิ่มระยะห่างระหว่างแต่ละฟิลด์ */
  }

  .form-row.right-aligned1 {
    display: flex;
    justify-content: flex-end; /* จัดตำแหน่งให้ฟอร์มไปที่ขวา */
    align-items: center; /* จัดตำแหน่งให้ label, dotted line, input อยู่ในแนวเดียวกัน */
    gap: 10px; /* เพิ่มระยะห่างระหว่างแต่ละฟิลด์ */
  }

  .form-row.right-aligned2 {
    display: flex;
    justify-content: flex-end; /* จัดตำแหน่งให้ฟอร์มไปที่ขวา */
    align-items: center; /* จัดตำแหน่งให้ label, dotted line, input อยู่ในแนวเดียวกัน */
    gap: 10px; /* เพิ่มระยะห่างระหว่างแต่ละฟิลด์ */
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

  .form-row.left-aligned {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
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

    input[type="text"],
    textarea {
      font-size: 0.9rem;
    }

    button {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
  }
</style>
