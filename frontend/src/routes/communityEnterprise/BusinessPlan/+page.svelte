<script>
  // @ts-nocheck

  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import { addToast } from "$lib/stores/toastStore";
  import Toast from "$lib/Toast.svelte";

  const BACKEND_API = import.meta.env.VITE_BACKEND_API; 
  const initialFormData = {
    d00: "",
    d0: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: "",
    d8: "",
    d9: "",
    d10: "",
    d11: "",
    d12: ["", "", "", "", "", "", "", "", "", ""], // แถวที่ 1
    d13: ["", "", "", "", "", "", "", "", "", ""], // แถวที่ 2
    d14: ["", "", "", "", "", "", "", "", "", ""], // แถวที่ 3
    d15: ["", "", "", "", "", "", "", "", "", ""], // แถวที่ 4
    d16: ["", "", "", "", "", "", "", "", "", ""], // แถวที่ 5
    d17: "",
    d18: "",
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
        "Authorization": `Bearer ${localStorage.getItem('sessionToken')}`
      },
      body: JSON.stringify({
        document_type_id: 5,
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

  function splitTextToLines(doc, text, maxWidth) {
    return doc.splitTextToSize(text, maxWidth);
  }

  function addMultilineText(doc, text, x, y, maxWidth, lineHeight) {
    const lines = splitTextToLines(doc, text, maxWidth);
    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineHeight);
    });
  }

  function generatePDF() {
    const doc = new jsPDF("p", "mm", "a4");

    // โหลดฟอนต์ภาษาไทย (THSarabunNew)
    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew", "normal");

    // ส่วนหัวเอกสาร
    doc.setFontSize(20);
    doc.text(
      "แผนประกอบการสำหรับวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน",
      105,
      30,
      { align: "center" }
    );
    doc.text(`แผนประกอบการ ปี......................`, 105, 38, {
      align: "center",
    });
    doc.text(`${formData.d0}`, 120, 37, { align: "center" });

    doc.setFontSize(14);
    doc.rect(135, 8, 70, 11, "S"); // กรอบสี่เหลี่ยม (x, y, width, height)
    doc.text(`วัน/เดือน/ปีที่รับเรื่อง ${formData.d00}`, 140, 15);

    doc.setFontSize(16);
    doc.text(
      "1. ข้าพเจ้า.......................... ชื่อ.................................. นามสกุล.................................... วัน-เดือน-ปีเกิด............................................",
      14,
      55
    );
    doc.text(`${formData.d1}`, 33, 54);
    doc.text(`${formData.d2}`, 61, 54);
    doc.text(`${formData.d3}`, 106, 54);
    doc.text(`${formData.d4}`, 163, 54);

    doc.text(
      `บัตรประจำตัวประชาชนผู้มีอำนาจทำการแทน........................................................................`,
      14,
      64
    );
    doc.text(`${formData.d5}`, 85, 63);

    doc.text(`2. ประเภทวิสาหกิจชุมชน`, 14, 74);
    doc.circle(61, 73, 1.5);
    doc.text(`วิสาหกิจชุมชน`, 65, 74);

    doc.circle(96, 73, 1.5);
    doc.text(`เครือข่ายวิสาหกิจชุมชน`, 100, 74);

    if (formData.d6 === "วิสาหกิจชุมชน") {
      doc.setFontSize(20);
      doc.text("/", 61.5, 73.5, { align: "center" }); // Centered inside the circle
      doc.setFontSize(16);
    } else if (formData.d6 === "เครือข่ายวิสาหกิจชุมชน") {
      doc.setFontSize(20);
      doc.text("/", 96.5, 73.5, { align: "center" }); // Centered inside the circle
      doc.setFontSize(16);
    }

    doc.text(
      `ชื่อ..................................................................................... ที่ตั้ง.................................................................................................`,
      14,
      84
    );
    doc.text(`${formData.d8}`, 20, 83);
    doc.text(`${formData.d9}`, 106, 83);
    doc.text(
      `รหัสทะเบียน..........................................................................................................`,
      14,
      94
    );
    doc.text(`${formData.d10}`, 35, 93);

    doc.text(`3. แผนการพัฒนาวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน`, 14, 104);

    // หัวข้อหลักของตาราง
    const columns = [
      { title: "ลำดับ", dataKey: "index" },
      { title: "ชื่อโครงการ/กิจกรรม", dataKey: "project" },
      { title: "การผลิต", dataKey: "production" },
      { title: "วัตถุดิบ", dataKey: "raw_materials" },
      { title: "ผลิตภัณฑ์", dataKey: "product" },
      { title: "การตลาด", dataKey: "marketing" },
      { title: "งบประมาณ (บาท)", dataKey: "budget" },
      { title: "ดำเนินการได้เอง", dataKey: "self_manage" },
      { title: "สนับสนุนโดยภาครัฐ (ระบุ...)", dataKey: "gov_support" },
      { title: "สนับสนุนโดยภาคเอกชน (ระบุ...)", dataKey: "private_support" },
    ];

    // ดึงข้อมูลจาก formData
    const data = Array.from({ length: 5 }, (_, i) => ({
      index: formData[`d${12 + i}`][0] || "",
      project: formData[`d${12 + i}`][1] || "",
      production: formData[`d${12 + i}`][2] || "",
      raw_materials: formData[`d${12 + i}`][3] || "",
      product: formData[`d${12 + i}`][4] || "",
      marketing: formData[`d${12 + i}`][5] || "",
      budget: formData[`d${12 + i}`][6] || "",
      self_manage: formData[`d${12 + i}`][7] || "",
      gov_support: formData[`d${12 + i}`][8] || "",
      private_support: formData[`d${12 + i}`][9] || "",
    }));

    // ใช้ autoTable เพื่อสร้างตารางพร้อมเส้นกรอบ
    doc.autoTable({
      startY: 110,
      head: [
        [
          {
            content: "ลำดับ",
            rowSpan: 2,
            styles: { halign: "center", cellWidth: 15 },
          },
          {
            content: "ชื่อโครงการ/ กิจกรรม",
            rowSpan: 2,
            styles: { halign: "center", cellWidth: 26 },
          },
          { content: "พัฒนาด้าน", colSpan: 4, styles: { halign: "center" } },
          {
            content: "งบ\nประมาณ\n(บาท)",
            rowSpan: 2,
            styles: { halign: "center", cellWidth: 20 },
          },
          { content: "การดำเนินการ", colSpan: 3, styles: { halign: "center" } },
        ],
        [
          { content: "การ\nผลิต", styles: { halign: "center", cellWidth: 14 } },
          {
            content: "วัตถุ\nดิบ",
            styles: { halign: "center", cellWidth: 14 },
          },
          {
            content: "ผลิต\nภัณฑ์",
            styles: { halign: "center", cellWidth: 14 },
          },
          { content: "การ\nตลาด", styles: { halign: "center", cellWidth: 14 } },
          {
            content: "ดำเนินการ\nได้เอง",
            styles: { halign: "center", cellWidth: 20 },
          },
          {
            content: "สนับสนุน\nโดยภาครัฐ (ระบุ...)",
            styles: { halign: "center", cellWidth: 22 },
          },
          {
            content: "สนับสนุน\nโดยภาค\nเอกชน (ระบุ...)",
            styles: { halign: "center", cellWidth: 22 },
          },
        ],
      ],
      body: data.map((row) => columns.map((col) => row[col.dataKey] || "")),
      styles: {
        font: "THSarabunNew",
        fontSize: 14,
        cellPadding: 3,
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
        fillColor: false, // Remove cell background color
      },
      headStyles: {
        fillColor: false, // Remove header background color
        textColor: 0,
        fontStyle: "bold",
        lineColor: [0, 0, 0],
      },
      theme: "grid",
    });

    doc.text(
      `3.1 เหตุผล/วัตถุประสงค์ที่จะดำเนินการ(ทำทำไม/ทำเพื่ออะไร)`,
      14,
      doc.autoTable.previous.finalY + 15
    );
    addMultilineText(
      doc,
      formData.d17,
      14,
      doc.autoTable.previous.finalY + 25,
      180,
      8
    );

    doc.addPage();
    doc.setFontSize(16);
    doc.text(`3.2 เป้าหมายที่จะดำเนินการ(ทำจำนวนเท่าไหร่)`, 14, 20);
    addMultilineText(doc, formData.d18, 14, 30, 180, 8);

    doc.text(
      "ลงชื่อ.................................................ผู้รองรับแผน",
      120,
      100
    );
    doc.text(
      "(................................................................)",
      120,
      110
    );
    doc.text(`${formData.d1} ${formData.d2}  ${formData.d3}`, 125, 109);
    doc.text("สมาชิกผู้มีอำนาจทำการแทน", 130, 120);

    // บันทึกเอกสารเป็นไฟล์ PDF
    doc.save("แผนประกอบการ.pdf");
    addToast("พิมพ์ PDF สำเร็จ", "success");
  }

  function resetFormData() {
    formData = structuredClone(initialFormData);
    addToast("ล้างฟอร์มสำเร็จ", "success");
  }

  function ClickData() {
    if (!formData.d00) {
      addToast("กรุณากรอกวัน/เดือน/ปีที่รับเรื่อง", "warning");
      return false;
    } else if (!formData.d0) {
      addToast("กรุณากรอกปีแผนประกอบการ", "warning");
      return false;
    } else if (!formData.d1 || !formData.d2 || !formData.d3) {
      addToast("กรุณากรอกข้อมูลชื่อ-นามสกุลให้ครบถ้วน", "warning");
      return false;
    } else if (!formData.d4) {
      addToast("กรุณากรอกวัน-เดือน-ปีเกิด", "warning");
      return false;
    } else if (!formData.d5) {
      addToast("กรุณากรอกบัตรประจำตัวประชาชน", "warning");
      return false;
    } else if (!formData.d6) {
      addToast("กรุณาเลือกประเภทวิสาหกิจชุมชน", "warning");
      return false;
    } else if (!formData.d8) {
      addToast("กรุณากรอกชื่อวิสาหกิจชุมชน", "warning");
      return false;
    } else if (!formData.d9) {
      addToast("กรุณากรอกที่ตั้งวิสาหกิจชุมชน", "warning");
      return false;
    } else if (!formData.d10) {
      addToast("กรุณากรอกรหัสทะเบียน", "warning");
      return false;
    } else if (formData.d12.some((value) => value === "")) {
      addToast("กรุณากรอกข้อมูลให้ครบทุกช่องในแถวที่ 1", "warning");
      return false;
    }
    const optionalFields = { d13: 2, d14: 3, d15: 4, d16: 5 };
    for (const [field, row] of Object.entries(optionalFields)) {
      if (
        formData[field].some((value) => value !== "") &&
        formData[field].some((value) => value === "")
      ) {
        addToast(`กรุณากรอกข้อมูลให้ครบทุกช่องในแถวที่ ${row}`, "warning");
        return false;
      }
    }
    if (!formData.d17) {
      addToast("กรุณากรอกเหตุผล/วัตถุประสงค์", "warning");
      return false;
    } else if (!formData.d18) {
      addToast("กรุณากรอกเป้าหมายที่จะดำเนินการ", "warning");
      return false;
    }
    return true;
  }

  
</script>

<div class="form-container">
  <div class="header">
    <div class="title">
      <h1 class="text-2xl font-bold">
        แผนประกอบการสำหรับวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน
      </h1>
      <div class="mt-2 text-2xl font-bold">
        <h2>แผนประกอบการ ปี</h2>
        <input
          type="text"
          placeholder="พ.ศ."
          maxLength={8}
          bind:value={formData.d0}
          class="text-center"
        />
      </div>
    </div>

    <div class="date">
      <span class="flex items-center gap-2 text-gray-700 font-medium">
        วัน/เดือน/ปีที่รับเรื่อง
      </span>
      <input
        type="text"
        placeholder="วัน/เดือน/ปี"
        class="border border-gray-300 rounded-lg px-3 py-2"
        bind:value={formData.d00}
      />
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field full-width">
      <h2>1.ข้าพเจ้า</h2>
      <div class="dotted-line researcher-input">
        <div class="researcher-field-group">
          <input
            type="text"
            placeholder="คํานําหน้า"
            bind:value={formData.d1}
            class="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="ชื่อ"
            bind:value={formData.d2}
            class="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="นามสกุล"
            bind:value={formData.d3}
            class="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
    </div>
    <div class="field full-width">
      <h2>วัน-เดือน-ปีเกิด</h2>
      <div class="dotted-line">
        <input
          type="text"
          placeholder="1-ตุลาคม-2546"
          bind:value={formData.d4}
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="field full-width">
      <h2>บัตรประจำตัวประชาชนผู้มีอำนาจทำการแทน</h2>
      <div class="dotted-line">
        <input
          type="text"
          bind:value={formData.d5}
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>
  </div>

  <div class="funding-source">
    <h2>2.ประเภทวิสาหกิจชุมชน</h2>
    <div class="checkbox-group three-col">
      <label>
        <input
          type="radio"
          name="objective"
          value="วิสาหกิจชุมชน"
          bind:group={formData.d6}
        />
        วิสาหกิจชุมชน
      </label>
      <label>
        <input
          type="radio"
          name="objective"
          value="เครือข่ายวิสาหกิจชุมชน"
          bind:group={formData.d6}
        />
        เครือข่ายวิสาหกิจชุมชน
      </label>
    </div>
  </div>

  <div class="form-row two-col">
    <div class="field">
      <h2>ชื่อ</h2>
      <div class="dotted-line">
        <input
          type="text"
          bind:value={formData.d8}
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>
    <div class="field">
      <h2>ที่ตั้ง</h2>
      <div class="dotted-line">
        <input
          type="text"
          bind:value={formData.d9}
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>
    <div class="field">
      <h2>รหัสทะเบียน</h2>
      <div class="dotted-line">
        <input
          type="text"
          bind:value={formData.d10}
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>
  </div>

  <span class="block mt-4 font-bold">
    3.แผนการพัฒนาวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชน (ใน "พัฒนาด้าน"
    ถ้าเลือกให้ " / " ที่ช่องนั้น สามารถเลือกได้หลายตัวเลือก ในส่วน
    "การดำเนินการ" ถ้าเลือกให้ ระบุด้วยได้รับการสนับสนุนจากที่ไหน ถ้า
    "ดำเนินการได้เอง" ให้ " / " ที่ช่องนั้น สามารถเลือกได้เพียงตัวเลือกเดียว
    หากไม่เลือกให้ " - " ที่ช่องนั้น)
  </span>
  <table
    class="border-collapse border border-gray-500 w-full text-sm text-center mt-4"
  >
    <thead>
      <tr class="bg-gray-200">
        <th class="border border-gray-500 px-2 py-1" rowspan="2">ลำดับ</th>
        <th class="border border-gray-500 px-2 py-1" rowspan="2"
          >ชื่อโครงการ/กิจกรรม</th
        >
        <th class="border border-gray-500 px-2 py-1" colspan="4">พัฒนาด้าน</th>
        <th class="border border-gray-500 px-2 py-1" rowspan="2"
          >งบประมาณ (บาท)</th
        >
        <th class="border border-gray-500 px-2 py-1" colspan="3"
          >การดำเนินการ</th
        >
      </tr>
      <tr class="bg-gray-200">
        <th class="border border-gray-500 px-2 py-1">การผลิต</th>
        <th class="border border-gray-500 px-2 py-1">วัตถุดิบ</th>
        <th class="border border-gray-500 px-2 py-1">ผลิตภัณฑ์</th>
        <th class="border border-gray-500 px-2 py-1">การตลาด</th>
        <th class="border border-gray-500 px-2 py-1">ดำเนินการได้เอง</th>
        <th class="border border-gray-500 px-2 py-1"
          >สนับสนุนโดยภาครัฐ (ระบุ...)</th
        >
        <th class="border border-gray-500 px-2 py-1"
          >สนับสนุนโดยภาคเอกชน (ระบุ...)</th
        >
      </tr>
    </thead>
    <tbody>
      {#each Array(5) as _, i}
        <tr>
          {#each Array(10) as _, j}
            <td class="border border-gray-500 p-1">
              <input
                type="text"
                class="w-full border-none text-center"
                bind:value={formData[`d${12 + i}`][j]}
              />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <span class="block mt-4 font-bold">
    3.1 เหตุผล/วัตถุประสงค์ที่จะดำเนินการ(ทำทำไม/ทำเพื่ออะไร)
  </span>

  <div class="form-row mt-2">
    <textarea
      bind:value={formData.d17}
      rows="5"
      class="w-full border border-gray-300 rounded-lg px-3 py-2"
    ></textarea>
  </div>

  <span class="block mt-4 font-bold">
    3.2 เป้าหมายที่จะดำเนินการ(ทำจำนวนเท่าไหร่)
  </span>

  <div class="form-row mt-2">
    <textarea
      bind:value={formData.d18}
      rows="5"
      class="w-full border border-gray-300 rounded-lg px-3 py-2"
    ></textarea>
  </div>

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
  <Toast />
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

  .text-center {
    text-align: center;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
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
