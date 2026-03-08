<script lang="ts">
  import { onMount } from "svelte";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import Toast from "$lib/Toast.svelte";
  import { addToast } from "$lib/stores/toastStore";

  const initialFormData = {
    e1: "",
    e2: "",
    e3: "",
    e4: "",
    e5: "",
    e6: "",
    e7: "",
    e8: "",
    e9: "",
    e10: "",
    e11: "",
    e12: "",
    e13: "",
    e14: "",
    e15: "",
    e16: "",
    e17: "",
    e18: "",
    e19: "",
    e20: "",
    e21: "",
    e22: "",
    e23: "",
    e24: "",
    e25: "",
    e26: "",
    e27: "",
    e28: "",
    e29: "",
    e30: "",
    e31: "",
    e32: "",
    e33: "",
    e34: "",
    e35: "",
    e36: "",
    e37: "",
    e38: "",
    e39: "",
    e40: "",
    e41: "",
    e42: "",
    e43: "",
    e44: "",
    e45: "",
    e46: "",
    e47: "",
    e48: "",
    e49: "",
    e50: "",
    e51: "",
    e52: "",
    e53: "",
    e54: "",
    e55: "",
    e56: "",
    e57: "",
    e58: "",
    e59: "",
    e60: "",
    e61: "",
    e62: "",
    e63: "",
    e64: "",
    e65: "",
    e66: "",
    e67: "",
    e68: "",
    e69: "",
    e70: "",
    e71: "",
    e72: "",
    e73: "",
    e74: "",
    e75: "",
    e76: "",
    e77: "",
    e78: "",
    e79: "",
    e80: "",
    e81: "",
    e82: "",
    e83: "",
    e84: "",
    e85: "",
    e86: "",
    e87: "",
    e88: "",
    e89: "",
    e90: "",
    e91: "",
    e92: "",
    e93: "",
    e94: "",
    e95: "",
    e96: "",
    e97: "",
    e98: "",
    e99: "",
    e100: "",
    e101: "",
    e102: "",
    e103: "",
    e104: "",
    e105: "",
    e106: "",
    e107: "",
    e108: "",
    e109: "",
    e110: "",
    e111: "",
    e112: "",
    e113: "",
  };

  const BACKEND_API = import.meta.env.VITE_BACKEND_API; 

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
        "Authorization": `Bearer ${localStorage.getItem('sessionToken')}`
      },
      body: JSON.stringify({
        document_type_id: 3,
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
  }

  function generatePDF() {
    const doc = new jsPDF();

    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew", "normal");

    doc.setFontSize(18);
    doc.text(`สัญญาจ้างเลี้ยง - ซื้อขายโคเนื้อ (${formData.e1})`, 105, 20, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("เลขที่สัญญา..............................", 160, 30);
    doc.text(`${formData.e2}`, 178, 29);
    doc.text("ทำที่...............................", 160, 40);
    doc.text(`${formData.e3}`, 168, 39);
    doc.text("วันที่.......................................", 105, 50, {
      align: "center",
    });
    doc.text(`${formData.e4}`, 95, 49);

    doc.text(
      'สัญญาฉบับนี้ทำขึ้นระหว่าง "บริษัท................................................." จดทะเบียนนิติบุคคลถูกต้องตามประมวลกฎหมายแพ่งและพาณิชย์ ',
      25,
      60
    );
    doc.text(`${formData.e5}`, 72, 59);

    doc.text(
      "หรือกฎหมายอื่น.............................ทะเบียนเลขที่.........................โดย นาย/นาง/นางสาว..................................................... อายุ..........ปี ",
      25,
      67
    );
    doc.text(`${formData.e6}`, 47, 66);
    doc.text(`${formData.e7}`, 88, 66);
    doc.text(`${formData.e8}`, 137, 66);
    doc.text(`${formData.e9}`, 160, 66);
    doc.text(`${formData.e10}`, 186, 66);

    doc.text(
      "เลขประจำตัวประชาชน.......................................... เป็นกรรมการผู้มีอำนาจกระทำการแทนบริษัท สำนักงานตั้งอยู่เลขที่..........หมู่..........",
      25,
      74
    );
    doc.text(`${formData.e11}`, 56, 73);
    doc.text(`${formData.e12}`, 176, 73);
    doc.text(`${formData.e13}`, 189, 73);

    doc.text(
      "ตําบล/แขวง........................ อำเภอ/เขต.........................จังหวัด.........................",
      25,
      81
    );
    doc.text(`${formData.e14}`, 42, 80);
    doc.text(`${formData.e15}`, 78, 80);
    doc.text(`${formData.e16}`, 107, 80);

    doc.text(
      "รหัสไปรษณีย์.......................เบอร์โทรศัพท์.......................Email...............................",
      25,
      88
    );
    doc.text(`${formData.e17}`, 44, 87);
    doc.text(`${formData.e18}`, 79, 87);
    doc.text(`${formData.e19}`, 107, 87);

    doc.text(
      'ซึ่งต่อไปในสัญญาฉบับนี้เรียกว่า "ผู้ประกอบธุรกิจทางการเกษตร" ฝ่ายหนึ่ง กับ ',
      25,
      95
    );

    doc.text("   บุคคลธรรมดาผู้ประกอบอาชีพเกษตรกรรม หรือ", 40, 102);
    doc.circle(40, 101, 1.5);
    if (formData.e20 === "บุคคลธรรมดาซึ่งประกอบอาชีพเกษตรกรรม") {
      doc.setFontSize(18);
      doc.text("/", 39.5, 102);
      doc.setFontSize(14);
    }

    doc.text("   สหกรณ์เกษตร หรือ", 40, 109);
    doc.circle(40, 108, 1.5);
    if (formData.e20 === "สหกรณ์การเกษตร") {
      doc.setFontSize(18);
      doc.text("/", 39.5, 109);
      doc.setFontSize(14);
    }

    doc.text("   กลุ่มเกษตรกรตามกฎหมายว่าด้วยสหกรณ์ หรือ", 40, 116);
    doc.circle(40, 115, 1.5);
    if (formData.e20 === "กลุ่มเกษตรกรตามกฎหมายว่าด้วยสหกรณ์") {
      doc.setFontSize(18);
      doc.text("/", 39.5, 116);
      doc.setFontSize(14);
    }

    doc.text(
      "   ผู้แทนของวิสาหกิจชุมชน.............................................................ตามรายงานการประชุมเมื่อวันที่...............หรือ",
      40,
      123
    );
    doc.circle(40, 122, 1.5);
    if (
      formData.e20 ===
      "ผู้แทนของวิสาหกิจชุมชน.............................................................ตามรายงานการประชุมเมื่อวันที่..............."
    ) {
      doc.setFontSize(18);
      doc.text("/", 39.5, 123);
      doc.setFontSize(14);
    }
    doc.text(`${formData.e21}`, 77, 122);
    doc.text(`${formData.e22}`, 166, 122);

    doc.text(
      "   เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน หรือ",
      40,
      130
    );
    doc.circle(40, 129, 1.5);

    if (
      formData.e20 ===
      "เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน"
    ) {
      doc.setFontSize(18);
      doc.text("/", 39.5, 130);
      doc.setFontSize(14);
    }

    doc.text(
      "โดยมีตัวแทน คือ นาย/นาง/นางสาว.....................................................อายุ..........ปี ",
      30,
      137
    );
    doc.text(`${formData.e23}`, 77, 136);
    doc.text(`${formData.e24}`, 124, 136);

    doc.text(
      "เลขประจําตัวประชาชน....................................บ้านเลขที่..........หมู่...........ตำบล/แขวง......................อำเภอ/เขต........................",
      25,
      144
    );
    doc.text(`${formData.e25}`, 56, 143);
    doc.text(`${formData.e26}`, 97, 143);
    doc.text(`${formData.e27}`, 109, 143);
    doc.text(`${formData.e28}`, 134, 143);
    doc.text(`${formData.e29}`, 167, 143);

    doc.text(
      "จังหวัด..............................รหัสไปรษณีย์.................เบอร์โทรศัพท์.........................Email...............................",
      25,
      151
    );
    doc.text(`${formData.e30}`, 35, 150);
    doc.text(`${formData.e31}`, 74, 150);
    doc.text(`${formData.e32}`, 107, 150);
    doc.text(`${formData.e33}`, 134, 150);

    doc.text(
      "ตามมติที่ประชุมคณะกรรมการดําเนินการ...................................ชุดที่..........ในการประชุมครั้งที่..........เมื่อวันที่..........",
      25,
      158
    );
    doc.text(`${formData.e34}`, 79, 157);
    doc.text(`${formData.e35}`, 113, 157);
    doc.text(`${formData.e36}`, 146, 157);

    doc.text(
      "..................................................ซึ่งต่อไปในสัญญานี้เรียกว่า “เกษตรกร” อีกฝ่ายหนึ่ง",
      25,
      165
    );
    doc.text(`${formData.e37}`, 37, 164);

    doc.text(
      "คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญาจ้างเลี้ยง ซื้อขายโคเนื้อ ดังต่อไปนี้",
      105,
      172,
      { align: "center" }
    );

    doc.text("ข้อ  ๑) วัตถุประสงค์ของสัญญา", 25, 179);
    doc.text(
      "๑.๑ ผู้ประกอบธุรกิจทางการเกษตรและเกษตรกรมีเจตนารมณ์ร่วมกันในการส่งเสริมและพัฒนาการเลี้ยงโคเนื้อ สร้าง",
      30,
      186
    );
    doc.text(
      "ความเป็นธรรมและพัฒนาศักยภาพในการเลี้ยงโคเนื้ออย่างยั่งยืน",
      25,
      193
    );
    doc.text(
      "๑.๒ ผู้ประกอบธุรกิจทางการเกษตร ตกลงว่าจ้างเกษตรกรเลี้ยงโค เนื้อและรับซื้อโคเนื้อที่เกษตรกรเลี้ยง ดังกล่าว และ",
      30,
      200
    );
    doc.text(
      "เกษตรกรตกลงรับเลี้ยงโคเนื้อแล้วขายคืนให้แก่ผู้ประกอบธุรกิจทางการเกษตร โดยทั้งสองฝ่ายร่วมกัน ดําเนินการวางแผนการผลิตที",
      25,
      207
    );
    doc.text(
      "สอดคล้องกับความต้องการของตลาดและมีการบริหารสินค้าเกษตรให้เกิดความสมดุล",
      25,
      214
    );
    doc.text(
      "๑.๓ เกษตรกรสามารถลดต้นทุนการผลิต มีตลาดรองรับที่แน่นอน ผลผลิตไม่ล้นตลาด เกษตรกร",
      30,
      221
    );
    doc.text(
      "มีรายได้ที่แน่นอนและมีความมั่นคงในอาชีพการเกษตรมากยิ่งขึ้น",
      25,
      228
    );

    doc.text("ข้อ ๒) สถานที่ดังต่อไปนี้ให้ถือว่าเป็นที่ทำการผลิต", 25, 235);
    doc.text(
      "ที่ดินโฉนดเลขที่..................เอกสารสิทธิอื่นๆ................ระวาง............พิกัด............หมู่............ตำบล/",
      30,
      242
    );
    doc.text(`${formData.e38}`, 51, 241);
    doc.text(`${formData.e39}`, 87, 241);
    doc.text(`${formData.e40}`, 108, 241);
    doc.text(`${formData.e41}`, 124, 241);
    doc.text(`${formData.e42}`, 137, 241);

    doc.text(
      "แขวง.................อำเภอ/เขต...................จังหวัด..........เนื้อที่..........ไร่..........งาน..........ตารางวา ซึ่งเป็นของเกษตรกรหรือ ",
      25,
      249
    );
    doc.text(`${formData.e43}`, 33, 248);
    doc.text(`${formData.e44}`, 62, 248);
    doc.text(`${formData.e45}`, 85, 248);
    doc.text(`${formData.e46}`, 101, 248);
    doc.text(`${formData.e47}`, 111, 248);
    doc.text(`${formData.e48}`, 124, 248);

    doc.text(
      "....................................................อายุ..........ปี เลขประจำตัวประชาชน...............................บ้านเลขที่..........หมู่..........ตำบล/",
      25,
      256
    );
    doc.text(`${formData.e49}`, 26, 255);
    doc.text(`${formData.e50}`, 73, 255);
    doc.text(`${formData.e51}`, 115, 255);
    doc.text(`${formData.e52}`, 151, 255);
    doc.text(`${formData.e53}`, 164, 255);

    doc.text(
      "แขวง............อำเภอ/เขต..................จังหวัด.....................รหัสไปรษณีย์......................หมายเลขโทรศัพท์...............................",
      25,
      263
    );
    doc.text(`${formData.e54}`, 33, 262);
    doc.text(`${formData.e55}`, 58, 262);
    doc.text(`${formData.e56}`, 80, 262);
    doc.text(`${formData.e57}`, 115, 262);
    doc.text(`${formData.e58}`, 156, 262);

    doc.text("Email.........................................", 25, 270);
    doc.text(`${formData.e59}`, 34, 269);

    doc.addPage();

    doc.text("ข้อ ๓) สถานที่ติดต่อระหว่างคู่สัญญา", 25, 30);
    doc.text(
      `ผู้ประกอบธุรกิจทางการเกษตกร  อาคาร.................เลขที่...............หมู่ที่...............ตำบล/เเขวง.............................`,
      35,
      37
    );
    doc.text(`${formData.e60} `, 88, 36);
    doc.text(`${formData.e61}`, 108, 36);
    doc.text(`${formData.e62}`, 126, 36);
    doc.text(`${formData.e63}`, 154, 36);
    doc.text(`อําเภอ/เขต........................`, 35, 43);
    doc.text(`${formData.e64}`, 52, 42);
    doc.text(
      `จังหวัด.............................ไปรษณีย์........................โทรศัพท์..................................อีเมล...................................................`,
      25,
      49
    );
    doc.text(`${formData.e65}`, 36, 48);
    doc.text(`${formData.e66}`, 70, 48);
    doc.text(`${formData.e67}`, 100, 48);
    doc.text(`${formData.e68}`, 134, 48);
    doc.text(
      ` เกษตรกร อาคาร.................เลขที่...............หมู่ที่...............ตำบล/เเขวง.............................อําเภอ/เขต.............................`,
      35,
      56
    );
    doc.text(`${formData.e69}`, 60, 55);
    doc.text(`${formData.e70}`, 80, 55);
    doc.text(`${formData.e71}`, 97, 55);
    doc.text(`${formData.e72}`, 125, 55);
    doc.text(`${formData.e73}`, 163, 55);
    doc.text(
      `จังหวัด.............................ไปรษณีย์.............................`,
      35,
      62
    );
    doc.text(`${formData.e74}`, 100, 61);
    doc.text(`${formData.e75}`, 140, 61);
    doc.text(
      `เบอร์โทรศัพท์..................................Email...................................................`,
      25,
      69
    );
    doc.text(`${formData.e76}`, 45, 68);
    doc.text(`${formData.e77}`, 80, 68);
    doc.text("ข้อ ๔) ระยะเวลาการปฏิบัติตามสัญญา ", 25, 76);
    doc.text(
      `สัญญาฉบับนี้มีผลใช้บังคับตั้งแต่       วันที่..................................จนถึงวันที่..................................โดยตั้งเเต่วันที่...................................`,
      25,
      83
    );
    doc.text(`${formData.e78}`, 80, 82);
    doc.text(`${formData.e79}`, 121, 82);
    doc.text(`${formData.e80}`, 165, 82);
    doc.text(
      `จนกระทั้งวันที่..................................ให้กรรมสิทธิ์ในโคเนื้อดังกล่าวให้เป็นของ...................................................`,
      25,
      90
    );
    doc.text(`${formData.e81}`, 46, 89);
    doc.text(`${formData.e82}`, 126, 89);
    doc.text(`ระยะเวลาการเลี้ยง`, 25, 97);
    doc.text(
      `ระยะเวลาการเลี้ยงโคเนื้อตั้งเเต้ วันที่..................................จนถึงวันที่..................................`,
      25,
      104
    );
    doc.text(`${formData.e83}`, 77, 103);
    doc.text(`${formData.e84}`, 115, 103);
    doc.text(`ข้อ ๕) หน้าที่ของผู้ประกอบธุรกิจทางการเกษตร`, 25, 110);
    doc.text(
      `๕.๑ จะเข้าไปมีส่วนร่วมในกระบวนการการเลี้ยงโคเนื้อ เช่น เป็นผู้กำหนดวิธีเลี้ยง หาพันธุ์โคเนื้อ อาหาร สารเคมี`,
      35,
      117
    );
    doc.text(
      `ระบบ การป้องกันโรค และ ปัจจัยอื่น ๆ ที่เกี่ยวข้องในการเลี้ยงโคเนื้อ`,
      25,
      124
    );
    doc.text(
      `๕.๒ เข้าตรวจสอบการเลี้ยงโคเนื้อทุก ๆ ระยะเวลาตามที่กำหนดไว้ตามเอกสารที่ทำการเลี้ยงและเข้าควบคุมการผลิตใน`,
      35,
      131
    );
    doc.text(`ทุกส่วนระหว่างทําการเลี้ยงตามสัญญาฉบับนี้`, 25, 138);
    doc.text(
      `๕.๓ เป็นผู้ซื้อโคเนื้อทั้งหมดที่ได้จากการเลี้ยงของเกษตรกร เมื่อโคเนื้อได้น้ำหนักตามที่ระบุไว้ในสัญญานี้`,
      35,
      145
    );
    doc.text(`ข้อ ๖) หน้าที่ของเกษตรกร`, 25, 152);
    doc.text(
      `๖.๑ จัดเตรียมสถานที่เลี้ยงโคเนื้อ ระบบชลประทาน และกำลังคน เพื่อปฏิบัติตามสัญญา`,
      35,
      159
    );
    doc.text(
      `โดย....................................................................เป็นผู้ออกค่าใช้จ่าย`,
      25,
      166
    );
    doc.text(`${formData.e85}`, 30, 165);
    doc.text(
      `๖.๒ ต้องรับพันธุ ์โคเนื ้อจากผู ้ประกอบธุรกิจทางการเกษตรหรือจัดหาพันธุ ์โคเนื ้อตามที ่ผู ้ประกอบธุรกิจทางการเกษตร`,
      35,
      173
    );
    doc.text(
      `กำหนด รวมถึงการนำอาหาร สารเคมี ระบบการป้องกันโรค และปัจจัยการผลิตอื ่น ๆ ที ่เกี ่ยวข้องตามที ่ผู ้ประกอบธุรกิจทางการ`,
      25,
      180
    );
    doc.text(`เกษตรจัดหาให้ มาใช้ในการเลี้ยงโคเนื้อเท่านั้น `, 25, 185);
    doc.text(
      `๖.๓ ต้องให้ผู ้ประกอบธุรกิจทางการเกษตรหรือตัวแทนของผู ้ประกอบธุรกิจทางการเกษตรเข้าดูแลและตรวจสอบขั ้นตอน `,
      35,
      192
    );
    doc.text(`การเลี้ยงสุกรตลอดระยะเวลาที่ระบุในสัญญาฉบับน `, 25, 199);
    doc.text(
      `๖.๔ ห้ามนำพันธุ์โคเนื้อชนิดอื่นเข้ามาเลี้ยงรวมกับสุกรตามข้อ (๖.๒) `,
      35,
      206
    );
    doc.text(
      `๖.๕ เมื่อโคเนื้อได้น้ำหนักตามที่กำหนดต้องขายโคเนื้อทั้งหมดให้แก่ผู้ประกอบธุรกิจทางการเกษตรแต่เพียงผู ้เดียว หากจะ`,
      35,
      213
    );
    doc.text(
      `นำโคเนื้อออกขายแก่ผู ้อื่นต้องได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ประกอบธุรกิจทางการเกษตร`,
      25,
      220
    );
    doc.text(
      `๖.๖ ในกรณีที ่เกิดโรคระบาดในเขตของจังหวัดหรือพื่นที่เลี้ยงโคเนื ้อ ให้เป็นหน้าที่ของเกษตรกรที ่จะต้องคอยสังเกตและ`,
      35,
      227
    );
    doc.text(
      `ดูแลอย่างใกล้ชิด หากเริ่มมีโรคระบาด ให้เกษตรกรรีบแจ้งให้ผู้ประกอบธุรกิจทางการเกษตรทราบทันที แต่ทั้งนี้ให้เกษตรกรสามารถ`,
      25,
      234
    );
    doc.text(
      `ดำเนินการใด ๆ ตามความเหมาะสมในการจัดการแก้ปัญหาก่อนได้เพื่อป้องกันความเสียหายในเบื้องต้น`,
      25,
      241
    );
    doc.text(`ข้อ ๗) เงื่อนไข หลักเกณฑ์ และวิธีการเลี้ยงโคเนื้อ`, 25, 248);

    doc.text(
      `๗.๑ ผู้ประกอบธุรกิจทางการเกษตรจะเป็นผู้จัดหาตัว (พันธุ์โคเนื้อ) หรือ (ลูกโคเนื้อ) ให้เกษตรกรเลี้ยงจำนวน`,
      35,
      255
    );
    doc.text(`..................................ตัว`, 25, 262);
    doc.text(`${formData.e86}`, 26, 261);

    doc.addPage();

    doc.setFontSize(14);

    doc.text(
      `๗.๒ ในระยะเริ่มแรกการเลี้ยงให้ใช้อาหารสูตร...................จำนวน...................กระสอบราคากระสอบละ...................บาท`,
      35,
      30
    );
    doc.text(`${formData.e87}`, 94, 29);
    doc.text(`${formData.e88}`, 118, 29);
    doc.text(`${formData.e89}`, 166, 29);

    doc.text(
      `๗.๓ การฉีดวัคซีนให้โคเนื้อต้องเป็นไปตามหลักเกณฑ์ด้านปศุสัตว์ดังนี้`,
      35,
      37
    );
    doc.text(`ก. วัคซีนป้องกันโรคปากเท้าเปื่อย`, 35, 44);
    doc.text(`ข. วัคซีนป้องกันโรคอหิวาต์`, 35, 51);
    doc.text(`ค. วัคซีนป้องกันโรคอื่น ๆ`, 35, 58);
    doc.text(`ทั้งนี้ ให้เป็นไปตามประกาศของกรมปศุสัตว์`, 25, 65);
    doc.text(
      `กรณีเกิดโรคระบาด เป็นหน้าที่ของผู้ประกอบธุรกิจทางการเกษตรและเกษตรกรต้องเฝ้าระวังการแพร่ะบาดในฟาร์มเลี้ยง`,
      35,
      72
    );
    doc.text(`โคเนื้อ`, 25, 79);
    doc.text(
      `หากเกษตรกรตรวจพบว่าอาหาร สารเคมี ระบบการป้องกันโรค หรือปัจจัยการผลิตอื่นที่เกี่ยวข้องที่ผู้`,
      35,
      86
    );
    doc.text(`ข้อ ๘) สถานที่ / วิธีการส่งมอบ / การชำระราคาค่าโคเนื้อ`, 35, 93);
    doc.text(`ให้คู่สัญญาทั้งสองฝ่ายปฏิบัติต่อกันดังต่อไปนี้`, 35, 100);
    doc.text(
      `เมื่อถึงกำหนดตามสัญญา ให้ผู้ประกอบธุรกิจทางการเกษตรซื้อโคเนื้อตามเกณฑ์ดังนี้`,
      35,
      107
    );
    doc.text(
      "ก. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง.................(น้ำหนักได้ตามมาตรฐาน) รับซื้อในราคากิโลกรัมละ...............บาท",
      35,
      114
    );
    doc.text(`${formData.e90}`, 88, 113);
    doc.text(`${formData.e91}`, 166, 113);

    doc.text(
      `ข. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง..................(น้ำหนักน้อยกว่ามาตรฐาน) รับซื้อในราคากิโลกรัม................บาท`,
      35,
      121
    );
    doc.text(`${formData.e92}`, 88, 120);
    doc.text(`${formData.e93}`, 166, 120);

    doc.text(
      `ค. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง.................(น้ำหนักเกินมาตรฐาน) รับซื้อในราคากิโลกรัมละ..................บาท `,
      35,
      128
    );
    doc.text(`${formData.e94}`, 88, 127);
    doc.text(`${formData.e95}`, 162, 127);
    doc.text(
      `คู่สัญญาทั้งสองฝ่ายตกลงกำหนดส่งมอบผลผลิตภายใน.....................วัน นับแต่วันที่ได้รับแจ้งจาก เกษตรกร/ผู้ประกอบ`,
      35,
      135
    );
    doc.text(`${formData.e96}`, 109, 134);
    doc.text(`ธุรกิจทางการเกษตร`, 25, 142);
    doc.text(
      `กรณีที่เกษตรกรเป็นผู้นำส่งผลผลิตแก่ผู้ประกอบธุรกิจทางการเกษตร ณ เลขที่……................ หมู่….....................`,
      35,
      149
    );
    doc.text(`${formData.e97}`, 138, 148);
    doc.text(`${formData.e98}`, 159, 148);
    doc.text(
      `ตำบล/แขวง……….……..........     อำเภอ/เขต………..…...........      จังหวัด……………………….….........        หรือ`,
      25,
      156
    );
    doc.text(`${formData.e99}`, 43, 155);
    doc.text(`${formData.e100}`, 82, 155);
    doc.text(`${formData.e101}`, 117, 155);
    doc.text(
      `กรณีผู้ประกอบธุรกิจทางการเกษตรเข้ามาจัดการรับผลผลิต ณ ที่ ทำการเลี้ยงโคเนื้อ ณ เลขที่…...….............. `,
      35,
      163
    );
    doc.text(`${formData.e102}`, 162, 162);
    doc.text(
      `หมู่……….................... ตำบล…………….................. อำเภอ……...……..................... จังหวัด…………................`,
      25,
      170
    );
    doc.text(`${formData.e103}`, 30, 169);
    doc.text(`${formData.e104}`, 62, 169);
    doc.text(`${formData.e105}`, 99, 169);
    doc.text(`${formData.e106}`, 135, 169);
    doc.text(
      `สําหรับค่าใช้จ่ายในการขนส่งผลผลิตทั้งหมดให้…………..…….......เป็นผู้รับผิดชอบ`,
      35,
      177
    );
    doc.text(`${formData.e107}`, 99, 176);
    doc.text(
      `เมื่อผู้ประกอบธุรกิจทางการเกษตรได้รับผลผลิตที่ได้มาจากการผลิตของเกษตรกรตามสัญญาฉบับนี้ทั้งหมดแล้ว ให้ผู้`,
      35,
      184
    );
    doc.text(
      `ประกอบธุรกิจทางการเกษตรแจ้งจำนวนผลผลิต/โคเนื้อ...........ตัว น้ำหนัก…....... กิโลกรัม ทั้งหมด`,
      25,
      191
    );
    doc.text(`${formData.e108}`, 95, 190);
    doc.text(`${formData.e109}`, 118, 190);
    doc.text(
      `วันที่ให้แก่เกษตรกรทราบเป็นหนังสือภายใน.................วัน และชำะราคาผลผลิต/โคเนื้อให้แก่เกษตรกร ภายใน.................วัน `,
      25,
      198
    );
    doc.text(`${formData.e110}`, 81, 197);
    doc.text(`${formData.e111}`, 165, 197);
    doc.text(
      "นับแต่นับแต่วันที่ได้แจ้งจำนวนผลผลิต/โคเนื้อ+-ทั้งหมดให้แก่เกษตรกรทราบ",
      25,
      205
    );
    doc.text("ข้อ ๙) กรณีเกิดข้อโต้แย้งหรือข้อพิพาทของคู่สัญญา", 25, 212);
    doc.text(
      "หากมีปัญหาข้อโต้แย้งหรือข้อพิพาทใด ๆ เกิดขึ้นเนื่องจากการไม่ปฏิบัติตามสัญญาฉบับนี้ สองฝ่ายดำเนินการตาม",
      35,
      219
    );
    doc.text("กระบวนการดังนี้", 25, 226);
    doc.text(
      "๙.๑ ให้คู่สัญญาทั้งสองฝ่ายนัดประชุมเพื่อหารือเจรจาหาข้อตกลงในข้อพิพาทให้เกิดความเป็นธรรมทั้งสองฝ่ายเพื่อ",
      35,
      233
    );
    doc.text(`หาข้อยุติ`, 25, 240);

    doc.text(
      `๙.๒ หากคู่สัญญาทั้งสองฝ่ายไม่สามารถหาข้อยุติตามข้อ ๙.๑ ดำได้ ให้คู่สัญญาทั้งสองฝ่ายเข้าสู่กระบวนการไกล่เกลี่ย`,
      35,
      247
    );
    doc.text(
      `ข้อพิพาท โดยยื่นคำร้องต่อคณะกรรมการไกลเกลี่ยข้อพิพาทกรุงเทพมหานครหรือคณะกรรมการไกลเกลี่ยข้อพิพาทประจำ`,
      25,
      254
    );
    doc.text(
      `จังหวัดตามพระราชบัญญัติส่งเสริมและพัฒนาระบบเกษตรพันธุสัญญา พ.ศ. ๒๕๖๐`,
      25,
      261
    );

    doc.addPage();
    doc.setFontSize(14);

    doc.text(
      `๙.๓ หากคู่สัญญาต้องการนำข้อพิพาทไปสู่กระบวนการในชั้นศาลจะต้องดำเนินการไกลเกลี่ยข้อพิพาทตามข้อ (๙.๒) ก่อน `,
      35,
      30
    );
    doc.text(`จึงจะใช้สิทธิทางศาลได้`, 25, 37);
    doc.text(
      `ข้อ ๑๐) ในกรณีมีการทำลายโคเนื้อ เนื่องจากมีเชื้อโรคระบาดหรือมีเหตุอันควรสงสัยว่ามีเชื้อโรคระบาด`,
      25,
      44
    );
    doc.text(
      `ก. หากผลตรวจสอบปรากฏว่ามีโรคระบาด เกษตรกรไม่ต้องรับผิดชอบในความเสียหาย เว้นแต่เป็นกรณีที่เลี้ยงโดย`,
      35,
      51
    );
    doc.text(`ปล่อยปะละเลยหรือกระทำโดยประมาทเลินเล่ออย่างร้ายแรง`, 25, 58);
    doc.text(
      `ข. หากผลตรวจสอบปรากฏว่าไม่มีโรคระบาด ให้คู่สัญญาทั้งสองฝ่ายร่วมกันรับผิดชอบในความเสียหาย เว้นแต่จะเป็นการ`,
      35,
      65
    );
    doc.text(
      `ทำลายตามคำสั่งของผู้ประกอบธุรกิจทางการเกษตร ให้ผู้ประกอบธุรกิจทางการเกษตรเป็นผู้รับผิดชอบ`,
      25,
      72
    );
    doc.text(
      `ข้อ ๑๑) หากเกิดข้อบกพร่องในด้านการผลิต กล่าวคือ ผลิตภัณฑ์ไม่ได้มาตรฐานจนก่อให้เกิดความเสียหายต่อผู้บริโภคโดยเหตุ`,
      25,
      79
    );
    doc.text(
      `ความผิดเกิดจากผู้ประกอบธุรกิจทางการเกษตรเอง ผู้ประกอบธุรกิจทางการเกษตรจะต้องรับผิดชอบและจะเรียกร้องให้เกษตรกร`,
      25,
      86
    );
    doc.text(`รับผิดชอบหรือเข้าร่วมรับผิดมิได้`, 25, 93);
    doc.text(
      `ข้อ ๑๒) ในกรณีเกิดเหตุสุดวิสัย หรือเหตุใดเหตุหนึ่งที่อยู่นอกเหนือการควบคุมของคู่สัญญา เช่น อัคคีภัย อุทกภัย วาตภัย และ`,
      25,
      100
    );
    doc.text(
      `ภัยธรรมชาติอื่น ๆ เป็นต้น อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญาได้ จะถือว่าคู่สัญญาฝ่ายใดฝ่ายหนึ่งผิดสัญญาไม่ได้`,
      25,
      107
    );
    doc.text(
      `และคู่สัญญาทั้งสองฝ่ายตกลงร่วมกันที่จะกำหนดแนวทางแก้ไขปัญหาดังกล่าว เพื่อบรรเทาความเสียหายที่เกิดขึ้น`,
      25,
      114
    );
    doc.text(
      `ข้อ ๑๓) หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งต้องการเปลี่ยนแปลงข้อสาระสำคัญในสัญญาฉบับนี้จะต้องแจ้งเป็นลายลักษณ์อักษร ให้แก่`,
      25,
      121
    );
    doc.text(
      `คู่สัญญาอีกฝ่ายหนึ่งทราบล่วงหน้าและข้อตกลงหรือข้อความที่เปลี่ยนแปลง คู่สัญญาจะต้องจัดทำเป็นสัญญาขึ้นใหม่หรือเป็นข้อ`,
      25,
      128
    );
    doc.text(`สัญญาเพิ่มเติมจากสัญญานี้`, 25, 135);
    doc.text(
      `ข้อ ๑๔) หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งผิดสัญญาตามที่ได้ระบุไว้ในสัญญาฉบับนี้แม้เพียงข้อหนึ่งข้อใด ให้คู่สัญญาอีกฝ่ายหนึ่งมี`,
      25,
      142
    );
    doc.text(
      `หนังสือแจ้งให้ปฏิบัติให้ถูกต้องภายใน………..วัน หากฝ่ายผิดสัญญาไม่ดำเนินการแก้ไขระยะเวลาดังกล่าว คู่สัญญาอีกฝ่ายมีสิทธิ`,
      25,
      149
    );
    doc.text(`${formData.e112}`, 72, 148);
    doc.text(
      `บอกเลิกสัญญาได้ทันทีและมีสิทธิเรียกค่าเสียหายได้ (ถ้ามี) พร้อมดอกเบี้ยในอัตราร้อยละ.......................ต่อปีของต้นเงิน`,
      25,
      156
    );

    doc.text(`${formData.e113}`, 138, 155);
    doc.text(
      `สัญญานี้ได้ทำขึ้นสองฉบับซึ่งมีเนื้อหาข้อความถูกต้องตรงกันทั้งสองฉบับ และคู่สัญญาได้อ่านและเข้าใจข้อความถูกต้อง`,
      35,
      163
    );
    doc.text(
      `ตรงกันแล้ว คู่สัญญาได้ลงลายมือชื่อไว้ต่อหน้าพยาน โดยผู้ประกอบธุรกิจทางการเกษตรเก็บไว้หนึ่งฉบับ และมอบให้แก่เกษตรกร`,
      25,
      170
    );
    doc.text(`เก็บไว้หนึ่งฉบับ`, 25, 177);
    doc.text(
      `ลงชื่อ.......................................เกษตรกร                      ลงชื่อ.......................................ผู้ประกอบธุรกิจทางการเกษตร`,
      25,
      191
    );
    doc.text(
      `      (............................................)                               (............................................)`,
      25,
      198
    );
    doc.text(
      `ลงชื่อ.......................................พยาน                            ลงชื่อ.......................................พยาน`,
      25,
      205
    );
    doc.text(
      `      (............................................)                                   (............................................)`,
      25,
      212
    );

    doc.save("สัญญาจ้างเลี้ยง - ซื้อขายโคเนื้อ.pdf");
    addToast("ดาวน์โหลดสัญญาเรียบร้อย", "success");
  }

  function ClickData() {
    if (!formData.e1 || !formData.e2 || !formData.e3) {
      addToast("กรุณากรอกข้อมูลหัวเรื่องให้ครบ", "warning");
      return false;
    } else if (
      !formData.e4 ||
      !formData.e5 ||
      !formData.e6 ||
      !formData.e7 ||
      !formData.e8 ||
      !formData.e9 ||
      !formData.e10 ||
      !formData.e11 ||
      !formData.e12 ||
      !formData.e13 ||
      !formData.e14 ||
      !formData.e15 ||
      !formData.e16 ||
      !formData.e17 ||
      !formData.e18 ||
      !formData.e19
    ) {
      addToast("กรุณากรอกข้อมูลประวัติส่วนตัวให้ครบ", "warning");
      return false;
    } else if (!formData.e20) {
      addToast("กรุณาเลือกว่าอีกฝ่ายเป็นองค์กรใด", "warning");
      return false;
    } else if (
      formData.e20 === "ผู้แทนของวิสาหกิจชุมชน" &&
      (!formData.e21 || !formData.e22)
    ) {
      addToast("กรุณากรอกข้อมูลผู้แทนของวิสาหกิจชุมชนให้ครบ", "warning");
      return false;
    } else if (
      formData.e20 ===
        "เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน" &&
      (!formData.e23 ||
        !formData.e24 ||
        !formData.e25 ||
        !formData.e26 ||
        !formData.e27 ||
        !formData.e28 ||
        !formData.e29 ||
        !formData.e30 ||
        !formData.e31 ||
        !formData.e32 ||
        !formData.e33 ||
        !formData.e34 ||
        !formData.e35 ||
        !formData.e36 ||
        !formData.e37)
    ) {
      addToast("กรุณากรอกข้อมูลเครือข่ายวิสาหกิจชุมชนให้ครบ", "warning");
      return false;
    } else if (
      !formData.e38 ||
      !formData.e39 ||
      !formData.e40 ||
      !formData.e41 ||
      !formData.e42 ||
      !formData.e43 ||
      !formData.e44 ||
      !formData.e45 ||
      !formData.e46 ||
      !formData.e47 ||
      !formData.e48 ||
      !formData.e49 ||
      !formData.e50 ||
      !formData.e51 ||
      !formData.e52 ||
      !formData.e53 ||
      !formData.e54 ||
      !formData.e55 ||
      !formData.e56 ||
      !formData.e57 ||
      !formData.e58 ||
      !formData.e59
    ) {
      addToast("กรุณากรอกข้อมูล ข้อ ๒) ให้ครบ", "warning");
      return false;
    } else if (
      !formData.e60 ||
      !formData.e61 ||
      !formData.e62 ||
      !formData.e63 ||
      !formData.e64 ||
      !formData.e65 ||
      !formData.e66 ||
      !formData.e67 ||
      !formData.e68 ||
      !formData.e69 ||
      !formData.e70 ||
      !formData.e71 ||
      !formData.e72 ||
      !formData.e73 ||
      !formData.e74 ||
      !formData.e75 ||
      !formData.e76 ||
      !formData.e77
    ) {
      addToast("กรุณากรอกข้อมูล ข้อ ๓) ให้ครบ", "warning");
      return false;
    } else if (
      !formData.e78 ||
      !formData.e79 ||
      !formData.e80 ||
      !formData.e81 ||
      !formData.e82 ||
      !formData.e83 ||
      !formData.e84
    ) {
      addToast("กรุณากรอกข้อมูล ข้อ ๔) ให้ครบ", "warning");
      return false;
    } else if (!formData.e85) {
      addToast("กรุณากรอกข้อมูล ข้อ ๖) ให้ครบ", "warning");
      return false;
    } else if (
      !formData.e86 ||
      !formData.e87 ||
      !formData.e88 ||
      !formData.e89
    ) {
      addToast("กรุณากรอกข้อมูล ข้อ ๗) ให้ครบ", "warning");
      return false;
    } else if (
      !formData.e90 ||
      !formData.e91 ||
      !formData.e92 ||
      !formData.e93 ||
      !formData.e94 ||
      !formData.e95 ||
      !formData.e96 ||
      !formData.e97 ||
      !formData.e98 ||
      !formData.e99 ||
      !formData.e100 ||
      !formData.e101 ||
      !formData.e102 ||
      !formData.e103 ||
      !formData.e104 ||
      !formData.e105 ||
      !formData.e106 ||
      !formData.e107 ||
      !formData.e108 ||
      !formData.e109 ||
      !formData.e110 ||
      !formData.e111
    ) {
      addToast("กรุณากรอกข้อมูล ข้อ ๘) ให้ครบ", "warning");
      return false;
    } else if (!formData.e112 || !formData.e113) {
      addToast("กรุณากรอกข้อมูล ข้อ ๑๔) ให้ครบ", "warning");
      return false;
    }
    return true; // คืนค่า true หากข้อมูลถูกต้อง
  }

  // ฟังก์ชันรีเซ็ตค่าเมื่อเปลี่ยนตัวเลือก
  function handleRadioChange(value: string) {
    if (value === "ผู้แทนของวิสาหกิจชุมชน") {
      formData.e23 = "";
      formData.e24 = "";
      formData.e25 = "";
      formData.e26 = "";
      formData.e27 = "";
      formData.e28 = "";
      formData.e29 = "";
      formData.e30 = "";
      formData.e31 = "";
      formData.e32 = "";
      formData.e33 = "";
      formData.e34 = "";
      formData.e35 = "";
      formData.e36 = "";
      formData.e37 = "";
    } else if (
      value === "เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน"
    ) {
      formData.e21 = "";
      formData.e22 = "";
    }
  }
</script>

<div class="form-container">
  <Toast />
  <div class="header">
    <div class="title text-center">
      <h1 class="text-2xl font-bold">สัญญาจ้างเลี้ยง - ซื้อขายโคเนื้อ</h1>
      <input
        type="text"
        placeholder="(กำหนดชื่อพันธ์ุ)"
        class="text-2xl mt-2 border p-2 text-center"
        bind:value={formData.e1}
      />
    </div>
  </div>

  <div class="form-row two-col right-aligned1">
    <div class="field">
      <h2 class="text-lg">เลขที่สัญญา</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e2} />
      </div>
    </div>
  </div>
  <div class="form-row two-col right-aligned1">
    <div class="field">
      <h2 class="text-lg">ทำที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e3} />
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
            bind:value={formData.e4}
          />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>สัญญาฉบับนี้ทำขึ้นระหว่าง บริษัท</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e5} />
        </div>
      </div>
      <div class="field">
        <h2>จดทะเบียนนิติบุคคลถูกต้องตามประมวลกฎหมายแพ่งและพาณิชย์</h2>
      </div>
      <div class="field">
        <h2>หรือกฎหมายอื่น</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e6} />
        </div>
      </div>
      <div class="field">
        <h2>ทะเบียนเลขที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e7} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>โดย</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="เช่น นาย สมชาย"
            bind:value={formData.e8}
          />
        </div>
      </div>
      <div class="field">
        <h2>นามสกุล</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e9} />
        </div>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>อายุ</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="เช่น 23 ปี"
            bind:value={formData.e10}
          />
        </div>
      </div>
      <div class="field">
        <h2>เลขประจำตัว</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="เลขประจำตัวประชาชน"
            bind:value={formData.e11}
          />
        </div>
      </div>
      <div class="field">
        <h2>เป็นกรรมการผู้มีอำนาจกระทำการแทนบริษัท</h2>
      </div>
    </div>

    <div class="form-row three-col">
      <div class="field">
        <h2>ตั้งอยู่เลขที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e12} />
        </div>
      </div>
      <div class="field">
        <h2>หมู่ที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e13} />
        </div>
      </div>
      <div class="field">
        <h2>ตําบล/แขวง</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e14} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>อําเภอ</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e15} />
        </div>
      </div>
      <div class="field">
        <h2>จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e16} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field">
        <h2>รหัสไปรษณีย์</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e17} />
        </div>
      </div>
      <div class="field">
        <h2>เบอร์โทรศัพท์</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e18} />
        </div>
      </div>
      <div class="field">
        <h2>E-mail</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e19} />
        </div>
      </div>
    </div>

    <div class="research-type">
      <h2>
        ซึ่งต่อไปในสัญญาฉบับนี้เรียกว่า “ผู้ประกอบธุรกิจทางการเกษตร” ฝ่ายหนึ่ง
        กับ
      </h2>
      <div class="checkbox-group">
        {#each ["บุคคลธรรมดาซึ่งประกอบอาชีพเกษตรกรรม", "สหกรณ์การเกษตร", "กลุ่มเกษตรกรตามกฎหมายว่าด้วยสหกรณ์", "ผู้แทนของวิสาหกิจชุมชน", "เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน"] as option}
          <label>
            <input
              type="radio"
              bind:group={formData.e20}
              value={option}
              on:change={() => handleRadioChange(option)}
            />
            {option}
          </label>
        {/each}

        {#if formData.e20 === "ผู้แทนของวิสาหกิจชุมชน"}
          <div class="form-row three-col">
            <div class="dotted-line">
              <input
                type="text"
                placeholder="ชื่อ-สกุล"
                bind:value={formData.e21}
              />
            </div>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="วันที่"
                bind:value={formData.e22}
              />
            </div>
          </div>
        {/if}

        {#if formData.e20 === "เครือข่ายวิสาหกิจชุมชนตามกฎหมายว่าด้วยการส่งเสริมวิสาหกิจชุมชน"}
          <div class="field">
            <h2>โดยมีตัวแทน คือ</h2>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="ชื่อ-สกุล"
                bind:value={formData.e23}
              />
            </div>
            <h2>อายุ</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e24} />
            </div>
            <h2>เลขประจำตัว</h2>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="เลขประจําตัวประชาชน"
                bind:value={formData.e25}
              />
            </div>
          </div>

          <div class="field">
            <h2>บ้านเลขที่</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e26} />
            </div>
            <h2>หมู่</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e27} />
            </div>
            <h2>ตำบล/แขวง</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e28} />
            </div>
          </div>

          <div class="field">
            <h2>อำเภอ/เขต</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e29} />
            </div>
            <h2>จังหวัด</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e30} />
            </div>
          </div>

          <div class="field">
            <h2>รหัสไปรษณีย์</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e31} />
            </div>
            <h2>เบอร์โทรศัพท์</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e32} />
            </div>
            <h2>E-mail</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e33} />
            </div>
          </div>

          <div class="field">
            <h2>ตามมติที่ประชุมคณะกรรมการดําเนินการ</h2>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="ชื่อสหกรณ์/กลุ่มเกษตร"
                bind:value={formData.e34}
              />
            </div>
            <h2>ชุดที่</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e35} />
            </div>
          </div>

          <div class="field">
            <h2>ในการประชุมครั้งที่</h2>
            <div class="dotted-line">
              <input type="text" placeholder="" bind:value={formData.e36} />
            </div>
            <h2>เมื่อวันที่</h2>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="ว/ด/ป ที่ประชุมและมีมติมอบตัวแทน"
                bind:value={formData.e37}
              />
            </div>
          </div>
        {/if}

        <div class="field">
          <h2>ซึ่งต่อไปในสัญญานี้เรียกว่า “เกษตรกร” อีกฝ่ายหนึ่ง</h2>
        </div>
      </div>
    </div>
  </form>

  <div class="title py-4">
    <h1 class="text-2xl font-bold center">
      คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญาจ้างเลี้ยง รับซื้อโคเนื้อดังต่อไปนี้
    </h1>
  </div>
  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">ข้อ ๑) วัตถุประสงค์ของสัญญา</h1>
      <h2 class="text-lg">
        ๑.๑
        ผู้ประกอบธุรกิจทางการเกษตรและเกษตรกรมีเจตนารมณ์ร่วมกันในการส่งเสริมและพัฒนาการเลี้ยงโคเนื้อ
        สร้าง ความเป็นธรรมและพัฒนาศักยภาพในการเลี้ยงโคเนื้ออย่างยั่งยืน
      </h2>
      <h2 class="text-lg">
        ๑.๒ ผู้ประกอบธุรกิจทางการเกษตร
        ตกลงว่าจ้างเกษตรกรเลี้ยงโคเนื้อและรับซื้อโคเนื้อที่เกษตรกรเลี้ยง
        ดังกล่าว และ
        เกษตรกรตกลงรับเลี้ยงโคเนื้อแล้วขายคืนให้แก่ผู้ประกอบธุรกิจทางการเกษตร
        โดยทั้งสองฝ่ายร่วมกัน ดําเนินการวางแผนการผลิตที่
        สอดคล้องกับความต้องการของตลาดและมีการบริหารสินค้าเกษตรให้เกิดความสมดุล
      </h2>
      <h2 class="text-lg">
        ๑.๓ เกษตรกรสามารถลดต้นทุนการผลิต มีตลาดรองรับที่แน่นอน ผลผลิตไม่ล้นตลาด
        เกษตรกร มีรายได้ที่แน่นอนและมีความมั่นคงในอาชีพการเกษตรมากยิ่งขึ้น
      </h2>
    </div>

    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๒) สถานที่ดังต่อไปนี้ให้ถือว่าเป็นที่ทำการผลิต
      </h1>
    </div>

    <div class="form-row gap-4">
      <div class="field">
        <h2 class="text-lg">ที่ดินโฉนดเลขที่</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="เช่น (นส.๓/นส.๓.ก/ส.ค.๑) ไม่ใช้ใส่ ( - )"
            bind:value={formData.e38}
          />
        </div>
        <h2 class="text-lg">เอกสารสิทธิอื่น ๆ</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="ไม่ใช้ใส่ ( - )"
            bind:value={formData.e39}
          />
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">ระวาง</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e40} />
        </div>
        <h2 class="text-lg">พิกัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e41} />
        </div>
        <h2 class="text-lg">หมู่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e42} />
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">ตําบล/แขวง</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e43} />
        </div>
        <h2 class="text-lg">อําเภอ/เขต</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e44} />
        </div>
        <h2 class="text-lg">จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e45} />
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">เนื้อที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e46} />
        </div>
        <h2 class="text-lg">ไร่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e47} />
        </div>
        <h2 class="text-lg">ตารางวา</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e48} />
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">ซึ่งเป็นของเกษตรกรหรือ</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="คำนําหน้า ชื่อ นามสกุล"
            bind:value={formData.e49}
          />
        </div>
        <h2 class="text-lg">อายุ</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e50} />
        </div>
        <h2 class="text-lg">ปี</h2>
      </div>

      <div class="field">
        <h2 class="text-lg">เลขประจำตัวประชาชน</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="เลขประจำตัวประชาชน"
            bind:value={formData.e51}
          />
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">บ้านเลขที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e52} />
        </div>
        <h2 class="text-lg">หมู่ที่</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e53} />
        </div>
        <h2 class="text-lg">ตําบล/แขวง</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e54} />
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">อําเภอ/เขต</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e55} />
        </div>
        <h2 class="text-lg">จังหวัด</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e56} />
        </div>
        <h2 class="text-lg">รหัสไปรษณีย์</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e57} />
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">เบอร์โทรศัพท์</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e58} />
        </div>
        <h2 class="text-lg">E-mail</h2>
        <div class="dotted-line">
          <input type="text" placeholder="" bind:value={formData.e59} />
        </div>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">ข้อ ๓) สถานที่ติดต่อระหว่างคู่สัญญา</h1>
    </div>

    <div class="field">
      <h2 class="font-bold text-lg">ผู้ประกอบธุรกิจทางการเกษตร อาคาร</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e60} />
      </div>
      <h2 class="text-lg">เลขที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e61} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">หมู่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e62} />
      </div>
      <h2 class="text-lg">ตําบล/แขวง</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e63} />
      </div>
      <h2 class="text-lg">อําเภอ/เขต</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e64} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">จังหวัด</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e65} />
      </div>
      <h2 class="text-lg">รหัสไปรษณีย์</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e66} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">เบอร์โทรศัพท์</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e67} />
      </div>
      <h2 class="text-lg">E-mail</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e68} />
      </div>
    </div>

    <div class="field">
      <h2 class="font-bold">เกษตรกร อาคาร</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e69} />
      </div>
      <h2 class="text-lg">เลขที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e70} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">หมู่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e71} />
      </div>
      <h2 class="text-lg">ตําบล/แขวง</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e72} />
      </div>
      <h2 class="text-lg">อําเภอ/เขต</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e73} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">จังหวัด</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e74} />
      </div>
      <h2 class="text-lg">รหัสไปรษณีย์</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e75} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">เบอร์โทรศัพท์</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e76} />
      </div>
      <h2 class="text-lg">E-mail</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e77} />
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col py-4">
      <h1 class="text-lg font-bold">ข้อ ๔) ระยะเวลาการปฏิบัติตามสัญญา</h1>
    </div>

    <div class="field">
      <h2 class="text-lg">สัญญาฉบับนี้มีผลใช้บังคับตั้งแต่</h2>
      <h2 class="text-lg">วันที่</h2>
      <div class="dotted-line">
        <input
          type="text"
          placeholder="1 มกราคม 2555"
          bind:value={formData.e78}
        />
      </div>
      <h2 class="text-lg">จนถึงวันที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e79} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">โดยตั้งแต่วันที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e80} />
      </div>
      <h2 class="text-lg">จนกระทั่งวันที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e81} />
      </div>
    </div>

    <div class="field">
      <h2 class="text-lg">ให้กรรมสิทธิ์ในโคเนื้อดังกล่าวให้เป็นของ</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e82} />
      </div>
    </div>
    <h2 class="font-bold">ระยะเวลาการเลี้ยง</h2>
    <div class="field">
      <h2 class="text-lg">ระยะเวลาในการเลี้ยงโคเนื้อ ตั้งแต่วันที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e83} />
      </div>
      <h2 class="text-lg">จนถึงวันที่</h2>
      <div class="dotted-line">
        <input type="text" placeholder="" bind:value={formData.e84} />
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๕) หน้าที่ของผู้ประกอบธุรกิจทางการเกษตร
      </h1>
      <h2 class="text-lg">
        ๕.๑ จะเข้าไปมีส่วนร่วมในกระบวนการการเลี้ยงโคเนื้อ เช่น
        เป็นผู้กำหนดวิธีเลี้ยง หาพันธุ์โคเนื้อ อาหาร สารเคมี ระบบ การป้องกันโรค
        และปัจจัยอื่น ๆ ที่เกี่ยวข้องในการเลี้ยงโคเนื้อ
      </h2>
      <h2 class="text-lg">
        ๕.๒ เข้าตรวจสอบการเลี้ยงโคเนื้อทุก ๆ
        ระยะเวลาตามที่กำหนดไว้ตามเอกสารที่ทำการเลี้ยงและเข้าควบคุมการผลิตใน
        ทุกส่วนระหว่างทําการเลี้ยงตามสัญญาฉบับน
      </h2>
      <h2 class="text-lg">
        ๕.๓ เป็นผู้ซื้อโคเนื้อทั้งหมดที่ได้จากการเลี้ยงของเกษตรกร
        เมื่อโคเนื้อได้น้ำหนักตามที่ระบุไว้ในสัญญานี้
      </h2>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">ข้อ ๖) หน้าที่ของเกษตรกร</h1>
      <h2 class="text-lg">
        ๖.๑ จัดเตรียมสถานที่เลี้ยงโคเนื้อ ระบบชลประทาน และกำลังคน
        เพื่อปฏิบัติตามสัญญา
      </h2>
      <div class="field">
        <h2 class="text-lg">โดย</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e85}
          />
        </div>
        <h2 class="text-lg">เป็นผู้ออกค่าใช้จ่าย</h2>
      </div>
      <h2 class="text-lg">
        ๖.๒
        ต้องรับพันธุ์โคเนื้อจากผู้ประกอบธุรกิจทางการเกษตรหรือจัดหาพันธุ์โคเนื้อตามที่ผู้ประกอบธุรกิจทางการเกษตร
        กำหนด รวมถึงการนำอาหาร สารเคมี ระบบการป้องกันโรค และปัจจัยการผลิตอื่น ๆ
        ที่เกี่ยวข้องตามที่ผู้ประกอบธุรกิจทางการ เกษตรจัดหาให้
        มาใช้ในการเลี้ยงโคเนื้อเท่านั้น
      </h2>
      <h2 class="text-lg">
        ๖.๓
        ต้องให้ผู้ประกอบธุรกิจทางการเกษตรหรือตัวแทนของผู้ประกอบธุรกิจทางการเกษตรเข้าดูแลและตรวจสอบขั้นตอน
        การเลี้ยงสุกรตลอดระยะเวลาที่ระบุในสัญญาฉบับนี้
      </h2>
      <h2 class="text-lg">
        ๖.๔ ห้ามนำพันธุ์โคเนื้อชนิดอื่นเข้ามาเลี้ยงรวมกับสุกรตามข้อ (๖.๒)
      </h2>
      <h2 class="text-lg">
        ๖.๕
        เมื่อโคเนื้อได้น้ำหนักตามที่กำหนดต้องขายโคเนื้อทั้งหมดให้แก่ผู้ประกอบธุรกิจทางการเกษตรแต่เพียงผู้เดียว
        หากจะ
        นำโคเนื้อออกขายแก่ผู้อื่นต้องได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ประกอบธุรกิจทางการเกษตร
      </h2>
      <h2 class="text-lg">
        ๖.๖ ในกรณีที่เกิดโรคระบาดในเขตของจังหวัดหรือพื้นที่เลี้ยงโคเนื้อ
        ให้เป็นหน้าที่ของเกษตรกรที่จะต้องคอยสังเกตและ ดูแลอย่างใกล้ชิด
        หากเริ่มมีโรคระบาด
        ให้เกษตรกรรีบแจ้งให้ผู้ประกอบธุรกิจทางการเกษตรทราบทันที
        แต่ทั้งนี้ให้เกษตรกรสามารถ ดำเนินการใด ๆ
        ตามความเหมาะสมในการจัดการแก้ปัญหาก่อนได้เพื่อป้องกันความเสียหายในเบื้องต้น
      </h2>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๗) เงื่อนไข หลักเกณฑ์ และวิธีการเลี้ยงโคเนื้อ
      </h1>
      <h2 class="text-lg">
        ๗.๑ ผู้ประกอบธุรกิจทางการเกษตรจะเป็นผู้จัดหาตัว (พันธุ์โคเนื้อ) หรือ
        (ลูกโคเนื้อ) ให้เกษตรกรเลี้ยงจำนวน
      </h2>
      <div class="form-row three-col">
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e86}
          />
        </div>
        <h2 class="text-lg">ตัว</h2>
      </div>

      <div class="field">
        <h2 class="text-lg">๗.๒ ในระยะเริ่มแรกการเลี้ยงให้ใช้อาหารสูตร</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e87}
          />
        </div>
        <h2 class="text-lg">จำนวน</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e88}
          />
        </div>
        <h2 class="text-lg">กระสอบ</h2>
      </div>

      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">ราคากระสอบละ</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e89}
            />
          </div>
          <h2 class="text-lg">บาท</h2>
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">
          ๗.๓ การฉีดวัคซีนให้โคเนื้อต้องเป็นไปตามหลักเกณฑ์ด้านปศุสัตว์ดังนั้น
        </h2>
      </div>

      <div class="field ml-10">
        <h2 class="text-lg">ก. วัคซีนป้องกันโรคปากเท้าเปื่อย</h2>
      </div>
      <div class="field ml-10">
        <h2 class="text-lg">ข. วัคซีนป้องกันโรคอหิวาต์</h2>
      </div>
      <div class="field ml-10">
        <h2 class="text-lg">ค. วัคซีนป้องกันโรคอื่น ๆ</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">ทั้งนี้ ให้เป็นไปตามประกาศของกรมปศุสัตว์</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          กรณีเกิดโรคระบาด
          เป็นหน้าที่ของผู้ประกอบธุรกิจทางการเกษตรและเกษตรกรต้องเฝ้าระวังการแพร่ระบาดในฟาร์มเลี้ยง
          โคเนื้อ
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          หากเกษตรกรตรวจพบว่าอาหาร สารเคมี ระบบการป้องกันโรค
          หรือปัจจัยการผลิตอื่น ๆ ที่เกี่ยวข้องที่ผู้ประกอบธุรกิจทางการ
          เกษตรจัดหาให้ ไม่ได้มาตรฐาน เสื่อมอายุ
          ให้เกษตรกรรีบแจ้งต่อผู้ประกอบธุรกิจทางการเกษตรให้เปลี่ยนทันที
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          หากผู้ประกอบธุรกิจทางการเกษตรไม่ดำเนินดังกล่าว
          จะต้องเป็นผู้รับผิดชอบในความเสียหายที่เกิดขึ้น
        </h2>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๘) สถานที่ / วิธีการส่งมอบ / การชำระราคาค่าโคเนื้อ
      </h1>
      <div class="field">
        <h2 class="text-lg">
          เมื่อถึงกำหนดตามสัญญา
          ให้ผู้ประกอบธุรกิจทางการเกษตรซื้อโคเนื้อตามเกณฑ์ดังนี้
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">ให้คู่สัญญาทั้งสองฝ่ายปฏิบัติต่อกันดังต่อไปนี</h2>
      </div>

      <div class="field">
        <h2 class="text-lg">ก. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e90}
          />
        </div>
        <h2 class="text-lg">(น้ำหนักได้ตามมาตรฐาน)</h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">รับซื้อในราคากิโลกรัมละ</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e91}
            />
          </div>
          <h2 class="text-lg">บาท</h2>
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">ข. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e92}
          />
        </div>
        <h2 class="text-lg">(น้ำหนักน้อยกว่ามาตรฐาน)</h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">รับซื้อในราคากิโลกรัมละ</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e93}
            />
          </div>
          <h2 class="text-lg">บาท</h2>
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">ค. กรณีโคเนื้อที่เลี้ยงมีน้ำหนักที่อยู่ในช่วง</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e94}
          />
        </div>
        <h2 class="text-lg">(น้ำหนักเกินมาตรฐาน)</h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">รับซื้อในราคากิโลกรัมละ</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e95}
            />
          </div>
          <h2 class="text-lg">บาท</h2>
        </div>
      </div>

      <div class="field">
        <h2 class="text-lg">คู่สัญญาทั้งสองฝ่ายตกลงกำหนดส่งมอบผลผลิตภายใน</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e96}
          />
        </div>
        <h2 class="text-lg">วัน</h2>
        <h2 class="text-lg">นับแต่วันที่ได้รับแจ้งจากเกษตรกร/</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">ผู้ประกอบธุรกิจทางการเกษตร</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          กรณีที่เกษตรกรเป็นผู้นำส่งผลผลิตแก่ผู้ประกอบธุรกิจทางการเกษตร ณ เลขที่
        </h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e97}
          />
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">หมู่</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e98}
          />
        </div>
        <h2 class="text-lg">ตําบล/แขวง</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e99}
          />
        </div>
        <h2 class="text-lg">อําเภอ/เขต</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e100}
          />
        </div>
      </div>

      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">จังหวัด</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e101}
            />
          </div>
          <h2 class="text-lg">หรือ</h2>
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">
          กรณีผู้ประกอบธุรกิจทางการเกษตรเข้ามาจัดการรับผลผลิต ณ ที่
          ทำการเลี้ยงโคเนื้อ ณ เลขที่
        </h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e102}
          />
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">หมู่</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e103}
          />
        </div>
        <h2 class="text-lg">ตําบล/แขวง</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e104}
          />
        </div>
        <h2 class="text-lg">อําเภอ/เขต</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e105}
          />
        </div>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">จังหวัด</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e106}
            />
          </div>
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">สําหรับค่าใช้จ่ายในการขนส่งผลผลิตทั้งหมดให้</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e107}
          />
        </div>
        <h2 class="text-lg">เป็นผู้รับผิดชอบ</h2>
      </div>

      <div class="field">
        <h2 class="text-lg">
          เมื่อผู้ประกอบธุรกิจทางการเกษตรได้รับผลผลิตที่ได้มาจากการผลิตของเกษตรกรตามสัญญาฉบับนี้ทั้งหมดแล้ว
          ให้ผู้ประกอบ
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">ธุรกิจทางการเกษตรแจ้ง</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">จำนวนผลผลิต/โคเนื้อ</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e108}
          />
        </div>
        <h2 class="text-lg">ตัว</h2>
        <h2 class="text-lg">น้ำหนัก</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e109}
          />
        </div>
        <h2 class="text-lg">กิโลกรัม</h2>
      </div>

      <div class="field">
        <h2 class="text-lg">ทั้งหมดให้แก่เกษตรกรทราบเป็นหนังสือภายใน</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e110}
          />
        </div>
        <h2 class="text-lg">วัน และชำระราคาผลผลิต/</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">โคเนื้อให้แก่เกษตรกร ภายใน</h2>
        <div class="dotted-line">
          <input
            type="text"
            placeholder=""
            class="text-lg"
            bind:value={formData.e111}
          />
        </div>
        <h2 class="text-lg">วัน นับแต่วันที่ได้แจ้งจำนวนผลผลิต/</h2>
      </div>
      <div class="field">
        <h2 class="text-lg">โคเนื้อ+-ทั้งหมดให้แก่ เกษตรกรทราบ</h2>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๙) กรณีเกิดข้อโต้แย้งหรือข้อพิพาทของคู่สัญญา
      </h1>
      <div class="field">
        <h2 class="text-lg">
          หากมีปัญหาข้อโต้แย้งหรือข้อพิพาทใด ๆ
          เกิดขึ้นเนื่องจากการไม่ปฏิบัติตามสัญญาฉบับนี้
          ให้คู่สัญญาทั้งสองฝ่ายดำเนินการตามกระบวนการดังนี้
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ๙.๑
          ให้คู่สัญญาทั้งสองฝ่ายนัดประชุมเพื่อหารือเจรจาหาข้อตกลงในข้อพิพาทให้เกิดความเป็นธรรมทั้งสองฝ่ายเพื่อหาข้อยุติ
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ๙.๒ หากคู่สัญญาทั้งสองฝ่ายไม่สามารถหาข้อยุติตามข้อ ๙.๑ ดำได้
          ให้คู่สัญญาทั้งสองฝ่ายเข้าสู่กระบวนการไกล่เกลี่ยข้อ พิพาท
          โดยยื่นคำร้องต่อคณะกรรมการไกล่เกลี่ยข้อพิพาทกรุงเทพมหานครหรือคณะกรรมการไกล่เกลี่ยข้อพิพาทประจำจังหวัด
          ตาม พระราชบัญญัติส่งเสริมและพัฒนาระบบเกษตรพันธสัญญา พ.ศ. ๒๕๖๐
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ๙.๓
          หากคู่สัญญาต้องการนำข้อพิพาทไปสู่กระบวนการในชั้นศาลจะต้องดำเนินกระบวนการไกล่เกลี่ยข้อพิพาทตามข้อ
          (๙.๒) ก่อน จึงจะใช้สิทธิทางศาลได้
        </h2>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <h1 class="text-lg font-bold">
        ข้อ ๑๐) ในกรณีมีการทำลายโคเนื้อ
        เนื่องจากมีเชื้อโรคระบาดหรือมีเหตุอันควรสงสัยว่ามีเชื้อโรคระบาด
      </h1>
      <div class="field">
        <h2 class="text-lg">
          ก. หากผลตรวจสอบปรากฏว่ามีโรคระบาด เกษตรกรไม่ต้องรับผิดชอบในความเสียหาย
          เว้นแต่เป็นกรณีที่เลี้ยงโดยปล่อยปะ
          ละเลยหรือกระทำโดยประมาทเลินเล่ออย่างร้ายแรง
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ข. หากผลตรวจสอบปรากฏว่าไม่มีโรคระบาด
          ให้คู่สัญญาทั้งสองฝ่ายร่วมกันรับผิดชอบในความเสียหาย เว้นแต่จะเป็นการ
          ทำลายตามคำสั่งของผู้ประกอบธุรกิจทางการเกษตร
          ให้ผู้ประกอบธุรกิจทางการเกษตรเป็นผู้รับผิดชอบ
        </h2>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2 class="text-lg">
          ข้อ ๑๑) หากเกิดข้อบกพร่องในด้านการผลิต กล่าวคือ
          ผลิตภัณฑ์ไม่ได้มาตรฐานจนก่อให้เกิดความเสียหายต่อผู้บริโภค โดยเหตุ
          ความผิดเกิดจากผู้ประกอบธุรกิจทางการเกษตรเอง
          ผู้ประกอบธุรกิจทางการเกษตรจะต้องรับผิดชอบและจะเรียกร้องให้เกษตรกร
          รับผิดชอบหรือเข้าร่วมรับผิดมิได้
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ข้อ ๑๒) ในกรณีเกิดเหตุสุดวิสัย
          หรือเหตุใดเหตุหนึ่งที่อยู่นอกเหนือการควบคุมของคู่สัญญา เช่น อัคคีภัย
          อุทกภัยวาตภัย และภัย ธรรมชาติอื่น ๆ เป็นต้น
          อันเป็นเหตุให้คู่สัญญาไม่สามารถปฏิบัติตามสัญญาได้
          จะถือว่าคู่สัญญาฝ่ายใดฝ่ายหนึ่งผิดสัญญาไม่ได้ และ
          คู่สัญญาทั้งสองฝ่ายตกลงร่วมกันที่จะกำหนดแนวทางแก้ไขปัญหาดังกล่าวเพื่อบรรเทาความเสียหายที่เกิดขึ้น
        </h2>
      </div>
      <div class="field">
        <h2 class="text-lg">
          ข้อ ๑๓)
          หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งต้องการเปลี่ยนแปลงข้อสาระสำคัญในสัญญาฉบับนี้จะต้องแจ้งเป็นลายลักษณ์อักษร
          ให้แก่
          คู่สัญญาอีกฝ่ายหนึ่งทราบล่วงหน้าและข้อตกลงหรือข้อความที่เปลี่ยนแปลง
          คู่สัญญาจะต้องจัดทำเป็นสัญญาขึ้นใหม่หรือเป็นข้อ
          สัญญาเพิ่มเติมจากสัญญาน
        </h2>
      </div>
    </div>
  </form>

  <form>
    <div class="flex flex-col gap-4 py-4">
      <div class="field">
        <h2 class="text-lg">
          ข้อ ๑๔)
          หากคู่สัญญาฝ่ายใดฝ่ายหนึ่งผิดสัญญาตามที่ได้ระบุไว้ในสัญญาฉบับนี้แม้เพียงข้อหนึ่งข้อใด
          ให้คู่สัญญาอีกฝ่ายหนึ่งมีหนังสือแจ้งให้ปฏิบัติให้ถูกต้องภายในให้คู่สัญญาอีกฝ่ายหนึ่งมีหนังสือแจ้ง
        </h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">ให้ปฏิบัติให้ถูกต้องภายใน</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder=""
              class="text-lg"
              bind:value={formData.e112}
            />
          </div>
          <h2 class="text-lg">วัน</h2>
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">
          หากฝ่ายผิดสัญญาไม่ดำเนินการแก้ไขระยะเวลาดังกล่าว
          คู่สัญญาอีกฝ่ายมีสิทธิบอกเลิก
          สัญญาได้ทันทีและมีสิทธิเรียกค่าเสียหายได้ (ถ้ามี) พร้อมดอกเบี้ยใน
        </h2>
      </div>
      <div class="form-row two-col">
        <div class="field">
          <h2 class="text-lg">อัตราร้อยละ</h2>
          <div class="dotted-line">
            <input
              type="text"
              placeholder="ไม่มีใส่ -"
              class="text-lg"
              bind:value={formData.e113}
            />
          </div>
          <h2 class="text-lg">ต่อปีของต้นเงิน</h2>
        </div>
      </div>
      <div class="field">
        <h2 class="text-lg">
          สัญญานี้ได้ทำขึ้นสองฉบับซึ่งมีเนื้อหาข้อความถูกต้องตรงกันทั้งสองฉบับ
          และคู่สัญญาได้อ่านและเข้าใจข้อความถูกต้องตรงกันแล้ว
          คู่สัญญาได้ลงลายมือชื่อไว้ต่อหน้าพยาน
          โดยผู้ประกอบธุรกิจทางการเกษตรเก็บไว้หนึ่งฉบับ และมอบให้แก่เกษตรกร
          เก็บไว้หนึ่งฉบับ
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

  .title h1 {
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

  .checkbox-group {
    margin: 10px 0;
    padding-left: 20px;
  }

  .checkbox-group label {
    display: block;
    margin: 5px 0;
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

    .title h1 {
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
