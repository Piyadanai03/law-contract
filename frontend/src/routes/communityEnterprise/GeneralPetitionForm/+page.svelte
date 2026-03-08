<script lang="ts">
  import { onMount } from "svelte";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { font } from "$lib/THSarabunNew-normal.js";
  import Toast from "$lib/components/Toast.svelte";
  import { addToast } from "$lib/stores/toastStore";

  const BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const initialFormData = {
    a0: "",
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
    a7: "",
    a8: "",
    a9: "",
    a10: "",
    a11: "",
    requestDetails: ["", "", "", "", ""],
    a12: "",
    a13: "",
    a14: "",
    a15: "",
    a16: "",
    a17: "",
    a18: "",
    a19: "",
    a20: "",
    a21: "",
    a22: "",
    a23: "",
    a24: "",
    a25: "",
    a26: "",
    a27: "",
    a28: "",
    a29: "",
    a30: "",
    a31: "",
    a32: "",
    a33: "",
    a34: "",
    a35: "",
    a36: "",
  };

  let isSubmitting = false;

  // สร้างตัวแปรรวมค่า
  $: a3a4a5 = `${formData.a3} ${formData.a4} ${formData.a5}`;

  let formData = structuredClone(initialFormData);

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
        document_type_id: 4,
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
    if (!formData.a0 || !formData.a1 || !formData.a2) {
      addToast("กรุณากรอกข้อมูลหัวเรื่องคำร้องให้ครบ", "warning");
      return false;
    } else if (
      !formData.a3 ||
      !formData.a4 ||
      !formData.a5 ||
      !formData.a6 ||
      !formData.a7 ||
      !formData.a8 ||
      !formData.a9 ||
      !formData.a10 ||
      !formData.a11 ||
      !formData.a12 ||
      !formData.a13 ||
      !formData.a14 ||
      !formData.a15 ||
      !formData.a16 ||
      !formData.a17 ||
      !formData.a18
    ) {
      addToast("กรุณากรอกข้อมูลประวัติส่วนตัวให้ครบ", "warning");
      return false;
    } else if (!formData.a19 && !formData.a22) {
      addToast(
        "กรุณาเลือกว่าเป็นสมาชิกของ 'วิสาหกิจชุมชน' หรือ 'เครือข่ายวิสาหกิจชุมชน'",
        "warning",
      );
      return false;
    } else if (formData.a19 && (!formData.a20 || !formData.a21)) {
      addToast("กรุณากรอกข้อมูลที่เกี่ยวข้องกับวิสาหกิจชุมชนให้ครบ", "warning");
      return false;
    } else if (
      formData.a22 &&
      (!formData.a23 ||
        !formData.a24 ||
        !formData.a25 ||
        !formData.a26 ||
        !formData.a27 ||
        !formData.a28 ||
        !formData.a29 ||
        !formData.a30 ||
        !formData.a31 ||
        !formData.a32 ||
        !formData.a33)
    ) {
      addToast(
        "กรุณากรอกข้อมูลที่เกี่ยวข้องกับเครือข่ายวิสาหกิจชุมชนให้ครบ",
        "warning",
      );
      return false;
    } else if (!formData.requestDetails.some((detail) => detail !== "")) {
      addToast("กรุณากรอกข้อมูลความประสงค์อย่างน้อยหนึ่งข้อ", "warning");
      return false;
    } else if (!formData.a34 || !formData.a35 || !formData.a36) {
      addToast("กรุณากรอกข้อมูลที่ยื่นเเบบคำร้องให้ครบ", "warning");
      return false;
    } else {
      return true; // ถ้าผ่านทุกเงื่อนไข
    }
  }

  function resetFormData() {
    formData = structuredClone(initialFormData);
    addToast("รีเซ็ตข้อมูลสำเร็จ", "success");
  }

  function generatePDF() {
    const doc = new jsPDF();

    doc.addFileToVFS("THSarabunNew.ttf", font);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew", "normal");

    const logo =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMWFhUWFiAXGBgXGB8gHxohHh0iIB8eHx8eHSggIR8nIB0gITEjJykrLi4xHx81ODMtOCguLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOsA1wMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAABQQGBwMBAgj/xABEEAACAQIEBQIEBAQEAwUJAAABAgMEEQAFEiEGEyIxQRRRByMyYUJScYEVM2KRJENyoVOSwRY00fDxCBclRGOCorHh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANozGtjgjeaZwkaAszMbAAf+e2M2rI3rK7L2qDKDO7VCQ6yEghiXUupRbVLIxXUWuACVA2uX/H0iyy5fQtYioqg7qRcMkC8wgjyCwQH9ccaqYHNcuqQOmop5oQb7bASr48qrHAXgY9wYMAYMGDAGDBgwBgwYMAYMGDAGDBgvgDBgwYAwYMGAMGDBgDBgwYAwYMGA8Ixk+QxHLZqw08jvBSzn1UDHVaKRRIk0Q8MgZgw/GqHyBjWcULhlQtfm9RYMklTT09vcqoVv2Bl7fY4C8U86uqujBlYAqwNwQexB9sGKl8MYTDDU0t7pS1ssMe5NkssijffYSW/bBgK7xJVluIKNyQIaZkpzf/i1EcrWv2vZYxbv1L74b8Vkw5es4SzZfUrJpBJ6Ek0mx9jA9/Nr28YX1GXtUUNcU/76lfJUKDcnmQODEo37GFY1FjbqxZaaop6yAPsafMIrEf1lLFfsxUafsY/c7hY6aZXRXQgqwDKR2IIuD/bHXFI+HE704lymdryUZ+Wx/wAyByTGw2/D9BHiwGLBxbmj0tHPURpreKMsq77kdr23sO5+wOAb451E6opZ2VVHcsQAP3O2KavGElNGsdcierewgELExVRYgLy2IuDdgCG7DfcYqy5HNmc7tJKJIoiVlqZUVotQ+pKSB7xhU+kzSBiTe3bAaXQ8Q0kzaIamGR/ypIpP9gb+MNMZFS8KUs68ugy6N4r39dUyOhdr7vFpHMfuSGGhSQLbWOND4Vyyop4eXUVPqCD0sVIKj8pYsxe35jv73wDrBgwYAwYMGADii0/GcjZmYCo9GWNKktu9So1Mt/a10t+ZPvhv8Q82aly+oljYrLpCREWvrchVsDt3N/0BwgreEJhka0aECqjjWUMP+KrCQkHvqJuNXe5ucBoWDCLgfNDVUFLOX1u8CF223cAB+2w6gcPcAYMGDAGDBitcbZFU1kaxwVQhW95EKtaUflLpIjqv2U7+cAyrOIKSJxHJUwo5NtLSKD/Yn74nwzK4DIwZT2KkEH9xjJJ+CKONY466hjpjflpV0ra4tRsF5iyqdJJ2BdWF9tXVuf8AZ6bKZVeNwjuTy2jGiGpNr8ieEdMcjAEJIm1/ANgQ1/BjPMw49kqKVpsqSN+XDz5pJ7iOEBdRjNt2lsDsDYdydxi75RWieCKcKV5kavpPcagDY/3wHWuq1hjeVzZEUuxPgKLn/bFT4VpiKKluCslXN6uQeQXY1BvcdhZU7e3vfHzx6TWPHlMTEGa0tSw7xwKwv+8jWQfbViTxHmnIp6iojG0ETQQgfjlYhdI33s4RB5uHwFZ+F2dkz1TORyq2sneBvBaPTcbn8Sbjb/Lf7YMReKMk9LldFQwN/iopVsQPxtFKznb3Gvz2tjzASsqzVnzKvVRs1QZaQ3HXJTRpHURj/UhC38dR8bN8sVKWc05v6KubnUzbjlTHqaK/4bkcxO1m1DvbCvhjKnqMmppYmHrQz1sJJ+qTmMWB3uUbVob7MMO6Senr6azginqGsQTpamnDdSE7FG5g1Kfz33s6jAUbi6rqhV1Na/ScqEMbcliDULJKsl37aRy7XUbavJAtjXcvzqnnp1qo5FMLJr132AAub+xG9we1jjNYJJoa+po65NbVMSEOAAK0RI0bgDsJDEwbQLdSd7EXr/EE3pKWqpFquW5gIGpSY62LYLIpFglQFHLf81rkHuAu/DvDKV+TwRTakRpfUxaD1RoZS8aqfw/LOkW7A/bDLPKNZJaXKolC0+gyzouw5Udgkf6PIQCPKq/3xZ8reMwxGI/LMa6Lfltt2+2KpwxmaVGb5lpN+THBBf8A08xm/wDyYj9sBdFWwt4x9YMGAMGDBgDAcJJeJqda0UDsVmaMSLcdLXLDSD+boJt5F7djavZj8Qk9LWvGjRywrNyRJa0vLYx61t3AcdS9xt4YEhR/jjxS0k8NJHcQQzKZpd9PN7iMkC3SvURcnfsNOLQ/HtT6t7w6aAQ/WSOaoOwqGjvzFhJ2uV7dWMgzmpWOL00dZzhIsVY0ZjWXmVTEB01gXWw3sSfbcnFrqUoFjkkinnOciATyE6utnVTJDotpICsV0AXAH9JsDr/2feJLQmhmDL1M9MzA2cCxlRSdiVJDWH5j7Y2bH5cyGuVYAPXlDQw+pp4tCxn1Bcl0JN2kAUWNiLhh2sQd4n42iWanhCM5mZEdltphaRdSKx8sfyjcDc2uLha8GEuV8SwVFRPTQsXanC8xh9N2LDSD5IKEHwDte4IDrAGDBgwHGrpklRo5FDI6lWUi4IIsQR7EYqNHlaVdNU5VUszchhGHv18sgPBICe7KOm57tG33xdMU6WvSLPFiuAaih99yY5CVH/Kzn9sAt4iyCHL8sghFzTw1ELVN/wDNQyASFx2IuQxB2stu2LVxPnkNFSSTzMAiobD85I6VX3J/89sLvihMi5TWFyADCVF/c7KP1JItjOaJ480EELzGd1jTnsgIjp4yAOTCDu88ttLSEmw12sNsBP8AhvTzwvD1SM+ZUiSmRzqMSw3DAX3N1ePQD9OrfVps1onqI5qxIU/7plvXK3cNPa0cY/MyAlyNzqKecIqVqmqzNo6NgiQ0xgnmU3WBndGMcV+kyKkSpfsDdiLjSX2aVkdHBGtNFqCtopYgbmpna9mJJuVG7s5PUbtfYEgviqVnzmCmkYBoI5amVe4aWRVQRgjYmKJh+xBtvsYiZ7lxy9srcSa6gTT81za8rywlpGt/qVQPYaRgwE7hoLSVM2UgleV8+idrkBJLkxMfIDBhYm5XsbqCJOYwvDLLVwwl1YWzCjG5fawmiHZmAHi3MG31rbHfMqGKbNnilB+bl66SLggxzlgykdnQsrAjcGxxxXOWhlSnzBxHKSUpq5QBHN7K+9lf3jbpJF1INrAt4jSOuioQpE9K1ZHonVyssdw4KN2YOp0i99W3ULrc17i7I5+bTNUBZ4ZnNP6yI21LOpRTNGBpDhyh5i7NpF7Gwxa+JuE0lYusjUFQ7q4liN4ZXVrozqbASXHc2O5F3GFj18NfSGCrY0Ms911g3p5JVci6NfSsgkXUUujE+W74Cm5TxLNTUOkrmFMKZjTztTlHj1DbdZLmJu1ypCk3Pc4l/DXiXL4czhWlEyR1MPJm57XJmDFkkLXIJftYWALdhiRmeftl038QMKzQVqtTVsIPT6mElHO4tZrEi43BbFc4fzfL6iaVRkzJC43enMkssLblWU9lF/ChfHe1sB+lxj3GcfCnj8VimjqG/wAVDcAsNJmVfxaT2cD6l/f3to+AMGDBgMk+Jaq1bG0MkOqWNqOXmMQiSBlli1sp1ROBrdGAvdbdicUiOnkamWmlNPPTxyuYaqYzqXeS3MEEcb66je9jpsST2GLJ8ReGaA1ky1shpnqm51NV2umyIjwyC+1iAwO31dx2NPpctZKudcyzBqWohEYjYFtEsRvqVDGAQhXTptYbna/YF+cZO0E0c4m9O6kOHmSOEhlIKlKeIvIo2vug+9jh/Lmsy06/LeMKRItacudTqvcTGcTFyWJ3Ok31WtY2xb+EeJKWmgk+RSzUw6TJSKxk1MbKs6TdZ1k6RIWIJsDa+3aLhCop39XLSxPSoeYKFaiRhD5LIj/KaQd9Oy7Gx7YDLcqyESCSWSQylzqaSGJZ1FzdjIl1njN/xBR/bDaooZ5IYYo5KaGnE/OSohkmMbzkKoEryM0sDhRYalG/t3Fv4vz+nrDBII4IIGuYp5hItS9r3aFYQXVAbdTWB32xSv4Q81SsNFmhqXmhdq2eQsI1jXbr5lyQq+97HTa3fAah8KnRZqoM9OHulPFHAw0hYYw7BNyzANMbue5JJ9saZjHPhjw9RCriky/VLHSiQT1bggSyOoAjRb/So6r29tze+NjwBgwYMAY/PHEnFOWz5jWVNQ1Rqh0Q0ZpzZgUJ1SBr6fquRqvcN29rt8WPiBFAfQRO/NksJ3hALwxndtO4HMK3sL7Dc22xkf8A2qy5KkOmUwvBH0xq7uHYDs0nU0bMe5BUgXtc2wFkzbNJ6+CKnZa2ZqyUJTy1IRI0AILuqR/WQvd22Ava297BwNks83PngPpqeonKLUFrsYlPLVYI+yswFjKdx+EbXx5QV0+Z6sxZRBzR6DLkLfy9YInmvYXKKGNxb6SPAu/pa2OKmjpsvlapdNNMlU9hDDcadSkAK7KLnp1HwzAYCPwpWUlDQy6zy6YVk6Io1NJUkSsqKv4iNIVbC5Ok3IFwbFQUkrzCrnQLUshSmh7iljNtTPbYubDVb2VAe5MfhrhaGAJyAZ3jXSKqo3Cd9XJTtck3JWwa5JdjfHOsmkrHaky92SIm1XXg3Y27xQt+KTuCw6YxsN9gCeukirs5paOHU8dHHNJNL31M40He1iQwFz2vcbaTgxYuGqGOPM6pYlCx09JT06KLbC8j29/I7974MBz4/gmgmpczhVnFKWSdFFyYZLamHuUtqt/4Yg5HxDDmEGhqdP8AEB3FPIQEqEV2UyQk7a+m5Q2INiSL6zohxl3CGVU9ZkkUc5MZill0SpcPC4mchww+m1xe+1u+AY0OWVVICuXuKmmXpehqTaSIb9MbsLgHwsnSR2NjfCXJeI6aCQ0DsaZdUksaTxkKgdi8kM6Hp0qxukqtYrtcWOqZJnVXRWXNY2khX+VmVKtyoI7yKtyPvsVO1w3fE3ilpKmlFTRiGtaD5sMsZBcFfqRkGzh0urKpUm5st7DAKM4yCKNpKR6YwUNeAC0ZDQwVAIEciEWKq/Su4UEhR5xZvhjXMKc0MyrHU0R5UiKLBh+CRR+V18+TfCeTIqKpptUElTSU1Sl3ERBhB/ErIwYQspBBYBACO99scqmCoSZGjZZMxpYyYmvZcwpr7oT25q+e9msezbBdOIuGIKvSzAxzobxTx2EkZ8EN5HupuDiHk/EjJMKKv0x1NvlONo6lR3aMns/5oibjxcb4acOZ5FWwLPESAdmRtmjYfUjjwwOxGPrPsjgrITDOmtDuPBU+GUjcMPfAMb49xjPFOe5pks0FKlXHURzajE1UnWNOwjd1YAgkjrNtzuQBi2cNcdSs0UOZ04o5Zh8ptamOUgC4G5KN1bKT9r3FsBL+JNHGKV6kwRTSRry9MoFnR3UMmr8O9iGuLEfrjHqXOarm/wAWEaBml/h8NFGl20KgvySAbMm1m0nc9rHTjY/ivGWymsCi55V9vYMCT+wBOMd4XWIhGiYyrltVMzBd2enmsvPUAdRQrcqO49sBWMjdOdUrFJNLLOjQRqwKsxltreY3IATqY7m7KDsBfGhVvxXWbLBRqbV0lqVnJ+XY9Jm1+xG/2J9hc1XNOHTLDTxNUKgp1ZEks7wTRs7PzI2jVvm3bS0RsxsvnbA/CVPqMHp51sNXN58RnAt9bUYHMCX6tH1gWN/BCBCx/iEHzZ454EhiESJeUSRKsZjTfRZipIY7dRup8umzSpjlOYyQQSpmEklHPRm68sppCxuT9D9mufuT3uOeTZAsFPNHJU9Ejo1TMgdYoUibWNLOqmSoY9KoouLtf7deMogF5dR8mWvqmrnjJ6oI1VhGrA7CR7t/sLYDZvh3lbR05qJFRJKrRKY4xZIlCBY0X3soFz5JOLZhDwPQNTZdSwyk6o4F1aj2NrkfoO37YrGbfEeZ1d8sozVRoxQztIqR3HsCdTAX77CwJ7C+A0S+KVn3EVTUs1JlKhnvolq2/kwe4B7PKPyi9j38jCP4fZvX5yZpKqWNKaJ+Vy6YECZrb3csX0AW+kjVfvYWOm08CooRFCqosFUWAA8ADbAIeCOEostgMasZJXbXNM/1SMe5O5sPYXPnuSSUPxMp46postjjjapqTd3KgtDCp65LkXB20jte59sWjifiBKOMMQXkc6IYV+uVz2VR/wDs9gMUBaSUvLBJMRV1QBr6iNSwpoyOiliKggOQbfpdj3XASKSlp6uQzciH0FCvJpWnOmHYfNmsRaQAhVU3A6WN7naJnnEMNZLFSxa6xaeRZnSniNpWtaONRfSkK/WzuxHYAm5tNq8qoqKAT1IqKoQoEplqbBWcC0ccVOqr1X2u0dx7kDZ7DUrR05eoeOkDnXLLIVMkjt9TBdwD+W+uwAGkWtgEk2U1ta6nNHEUBF48upmu0lv+K4tdRexFwvbdfMjPOLIaAITEpjhljidYv5dIrXHgdc2n8KjpB8Xu/sFVUVob0qSUVId5a2baaVQD/LVwSB/W+wF7DHPjKkiio6CnpoyqtmEAjU92sxYub9RJsWJO5vc98A7+H+XSCOasnUrNWymdlbuiWtEhB3BVLXHgk4MWsY9wHhGM54nymagmSopKk09NNVK1QgQMBI4KK9rX0M5UOtx4IIPbR8Qs5yyOpheCUXRxvY2IIIIIPgggEH3AwFVgzlYpBT1H+BnYm1+qln+6E2AJ7lbo9++rufiq4UplczCCWklI3noXIU+RdF79/MRH3Ix76hnZ8sr+RK6qJEaZeiqjJ0g+ySq1gbA7kEDfZZNw9NRm9DXSUVv/AJeqPMpz4ARyToB+x1Wt0jtgFfoJ6StUw5wT6tyqhkTRzu4WWJbAcwAjWoVtXe5a+J+e5FXSKHXLaYVURLRz0lSEKudywV41BBOxV73BPvj6zatzB00Zjk8dXGQDzqOS5HkMgPzAb7ggi18J8g4hmnq3p2po5CQOR/EA0FTIoH0cxY3Vyu4uSCQLm+9gYUFTV801MVOYMxVQayibZKxBYc2E3KlxtuCbE2PcFtA4a4ihroRNCTsdLows8bDujr4Yf+m2M94k4azCo5b09DBS1EJJikStYst7XOkRqpvax1d+2IEGYSS1Lxo6UGdqgD20mCtFrj3XX2IJ3H3F9IL/AInlK6tqmsXWjiSkhjFvmVM7EC3vpBJI94x+/DgX4WxT1c8dSzSU9LaIgMQGmKBpApFiFQkj3PST5GFXC2Z+krKWnrY3ienkqKqpMh/my8pjG253sALG9iWJHe51z4Q3OWRTPtJUyyzP92eVv77AHAJPiBQzZVSLLR1sqR8xY2hntMrKx3CiRWbYfhB7A9sUCTgufLqyGdKwKjrzo54E/B/mFVJsyoCrFLm6aiPpIxrvGFDmDVcE9NDBURxxsBHM5UK7bF7dmOjpB8Av74ofC1e0UMtLmUOmhiq2ihqEcsaKVbEASfUFBayyeDcG4OA9r+HqvWHFBKHexNRldWI45792KMOnVtftfEx/hzW9/T0JiI1GEO4nVu4YVWgu0nuSdG1tNsfWc1OZZKiyU5WppWKhQFBS7EAdII5Ra43jJjYn6UJ3YP8AEer1NTpDRNVoGvAKmQtdRug+SELixuoc9rd8AigyushPMNE6GBSfWZnV85YQO5RF6SfYgHFWyzhmtknnzJ5Im9MefK1aH2O7KrKl/mBQrGPsupF77C68NS1ubRitrJeTTqdQdgFjQDzEhJDODf58l9BA0rfccc0rJp5KGnoKZBl5lYwiZ2QVTxDXrf8AGU1DUNVy7C5wDnhfIZc5o46rMaydxLr/AMPCRFElnK2IUamI0/iO1yN++KRxr8MYoa1KWmeRUqIXenVjqBmjFyh27MmwPe5HcbY1jgqkzBJalquKCKKRg6xxSM3WfrYX2CtsSPzXPk4UfGx2jo4K2L66SrSQG/jdSux8tpB/fAJ/hNm8VNJHTWCpXwrURWFgJkBSoj+3UmoDsNx7AaJxLxHFRopYF5ZDphhTd5W9gPA92Owx+esxrpqjMDDlqM7x1jVNIY+yCSzPe+wTUEO+w6we+L2a2ZJJkp54qrNmTTNUySKsVKDtyoQ21736QNzct+XASc0eqjmaRI/V5y6bKpHJoI37AFiFDkeTu257bM1yWnzWCFo6WhpYXkcyO89W8pZ22LvpS5JsDsbfYYX5HRV8Kcg0NBO7sZJOZVa5HJ+p31Ib+O3YAYh5hnlQtT6L0gVApaohypS8m/0RyS6YxGGszHT1Wt74CNlmWVlTXmrmzOMrHqhRxGpJcbSCmi306T0iQjUe9iDfF5y7IKeN+clM8svf1Na5JA9xru6/ZQijv2wsy2ozHQVosspsuhX/ADKlt9I7nlxgbgE/U374+zw0tUR6yqnzA7HloeVTXB2uE6DY97szbdj2wBU8R+ol5FD/AI2oXvIbikpztu1tnYdwLu2xsV3x9cD5bPUyGsq6gzxwzzrSXAB+so0rWAH4SEAHSrH3265pUmMLlFAIY6iRSziIWWlhP1PYDd7kBbgEltRsNsXDKcvjp4Y4IhaOJAij7AWF/c+5wEoY9wYMAYMGDAUv4mZVE8UNXJCkwo5RI6OgYNEw0yix9lIk/VBiNUcN+n0tl+ZNTLIPlwzMJYWFuyK51AWt9J222tti9ugIIIuCLEHzijVuU19BG4ohFVUgDMKWe+tFsTy4nFwV8KrA22F8BBEmYwG8uVRSXuWly6cxk7C50GzMbACxPjETO86iq4DT1VPnEYLXF6VSUZTcMrrGTcHsQe3mxxI4Xr6moo46yOkp3VlZtFNVSQFSDupX6L/qw99r4+1zKvZjpyyq97LmcZH9+Yf7XwFdy/PKmSp9PMkEkTMqwz19C6NK1rKjPsofYAEjqPbuBh9m+T1NUslNM2UU5sLoqs8iE30sG1RlSfB0+DbHLOYa2pgenkymt0t3IzFCdjcHqYrsbHt4GEi1OdUr8yuMyUUYvrc0k0se4s7WGtwPOnqtv4tgOOdxxmOOmzV1rYNHysypuqSH7S6dV1He+9/NzuLHkebx5fRrS5hy5KHQBBWQoWikXwrhdRSS+4PYnsbjdtPJPVQg02ZPJHIPqpqZCSCdwHJ0o/cHUbj2vbFPrsiTKVJhq4qeJ0CtRVjc71HcMWSO+kkkC8YI28DbAbHQ1CyRpIhujqGU+4IuDvv2OM/qvhoojrdc8syTPLPFT30xiRxcFgN3IYC17AWG198fPwe4pEsHoZkaGeBbxxyXBaE/QRqAJ0ghb+bA+cXarzuKOohpWLc2cMyAKSLJa92AsO/n/wAMBieRCpmoUTJmlOinK1kMq/JL6Orl6xtMxN7KQLgHa9z91GV1CUv8WjipBUyqAJkMhkMsjBGCw25aT6iVLA7EMbAnbeUjAFgAP0woThyET867Ea+aIiRy1lIIMoFrhyD72uSbaiTgMR4thqIqSamzSSQ1ICJRQxqRTlQyg8vlgKzj6bMAR4vfGqR8AJHVU00E8kcNO7OtMetAWQodDE6kFvw7j2Avi4PCptcA2NxcXsfcff74g5bnUU8k8UZYtTvy5LqQL2vsSLH9v+ouH3nVXFDBLJOdMSoTId9ltv8AT1dvbf2xmfEdfDmNJ6emaOlymPSJap1Kg6GBEUCm1zcWJta+wue/X4y8QCRRl0ETVDFlkqljDNy41OoBygJW5AY+dKntcHEbJeEkrwlRPUrWwooWGGicRR057WCEg3UEEMWVttwcAty6JXhkpcvP8Lowql6upBSWqBJBKu1gFFj27XGy9sXTKKXMoYxTwSZXLEosFVHjsD3uqswP+177nHLMWloYea2cPFGNtNdCjubbkJp5bO3tbUPa+ElLJnNSp59PUJRsnSKUUySupH0tql1IP6VGre1x5DjVcR1nqHpdTJSxkrLPltE+8lheJH1SKCAd2sCCpFvOJ+X8QUlLGYqWhzdwzl2CwyanY7s5YnWSbd73w0y/MJIEEcGW5nHGosqAwsB+muViP0v9/OCr4grD0rQVx82lqKeG4/1K+rv4BGA5x1eZSjVHlMURHUstdVaytluCVAZ1sfAb37XvgzWjrRDJWZhmnLp449ZioV5YNhtaVizksemw77b+MQOI6yvggNR6CjFioQzTPUOzSOoCqNtySN9Vth7Yb5RwtWVRjmziVH0EMlJELQqR2Z++th4F7C3nAcvg/wAOmGneslj5ctW2vQbkpH+BST1Em+ok7m4vvjQceAY9wBgwYMAYMGDAGPCMe4MBnHHHBzQB8wy15YJl65oYfpnH4zyyChk03I6SCQNr74+EoameCKqgqaGZJVBV5qHqI8glG2I3FtIta2NJOKVxBwK5Jly6qloZb6isbHkuT3LRX0gn3A89jgK/FkteO7ZZYHYemnt+pFwL/wB8SzlNXpNqijjZxpJgyxmbfuNyQR92W398e5bHUkPDUZrUwVMYGqNzTqrXGzRuYeqMkEagLjcEA4WVVTSBx6jODMD3T+JFV7eVp4V+3cjz3wCzNODQi65qtYWDBhLyo6VWttZ4+aFI7XPJ1EAC57YiUPGEVOWYUCl0NpKugQcqTxcvLCWUX8r38e2HmV1ORI90moy4JOrkSzyD2PMlLEkEjq0/bYYlzcc5OQUJnrHC9UbrYe38uUpCPq7Bb/bbAVDipXqJKepV6SpMx9NHHTVD85Gc61cSym+oadF2AAB06RfZ1k3GlXRrommlYqbCOvpZVe3sJ4Q4N7bFlN/JtiRx7w9JUUMtX6aloyoV4xHEj1EhuvLBlWwQnYaU1HsNR7Yc5HPnnp4JYJqStikiV1MwaOXcXsSt1JHa5N798Atj+LdRI3KioEeYkBI1qQS5PlQEvYdze1gCdhj7h47hE0oSqlmrbctE0EUskgF+TGPHVdRITqJtuRYYaz5jmrMPU5Qr6TcTU1QmuM2I1IHsb2JFtQvcjcEjFbXK6dWWpgpKxq1mBamEVlgc7PUBG+UrEAlOoqCw9jYJf/vZqipH8PiV1uGV62IFCNiGQ9YIP4SAe/thbS8bZhWSaSZ9JJAiy+nI1e2uomtoHgsouL4t0WY5sCwpsohiFydU1Qmp9+7aAeo9zcn9ThZxjLngoqiWeempUVNlpg7yuWOlU1tYKSSoutzvgKtkNT6Z6qt5tDTa35Rhepl5nyTZmEiBmdmOo3ZH1EA2N8fVdna1gQiBKCQjU1bM0sLON7GN4o40b+kye304fcLZBLQQR1EMFLWU8kKltSRRTpcAsvMKhZF1b9ZB2AvtfEqi+IGWE8qGpkp2O3Jkj5qA/YIWAH2RwPtgIlDwqp+fDUVMzmx9QTS1oW1rWMic7cb2UbW/TDMUMoLsZKLSpIPMy+aEjYHVq1g7A9xt38jZZV5lkjOyl6ESOQCyc6kJub9TID3O9yR9/fEkZnQozlM0mUkbaMzilUbeBUve/wCoPfv4ATKh6sgfPyph/U80m52FkMhDHfHmYZfUU8HqJayGO4KqlJSRI0zN/LjBmDnUTsAAO/2vj4zOeqGmnpMznqpZF1IsaU/QLH5k0vLIEd7AWGo2NtXh9w3we0Zjmrqh6ypQdLyfRET35adgfGsjV+g2wHPhzgpo+XNXVMtXOhDLrb5UTDsUjFl1AG2si/tbFwAx6MGAMGDBgDBgwYAwYMGAMGDBgDFA4++Iy0cgo6VedVta4Csywg/icICxNt9AF7fqLvOPc/aio3kjAaZyIoFNuqRzZe/t9X6DGU8PpmNNVIsWVmSqpo3mqXknjDSvPcBy42KgBgqXP9xcgvlMFZV82fM4y0KkNJWopR3JB5cVKwUxotiCzbkn6fOGFCWllymqqKSjipWqWgRYYgOYxuEk3AIQvuq/Yse4sup89kiyyqknytmeukkaOpsGUmYnuSCwtclfzH274M+4egneGDKql2eipTOTNIwu10KhElI0MbFiAABsDY4CxZRGtFnzDSqKap4mttdaqMSQ9+45kZTb7D7HWM4yeCriaGojWRGFiGHb7g9wfYjcbYyviRoswpKfOI9QUxiGs0A6otLXWUAeYZev7oT4w4zfO6yrpI4IoubMrqtbHDKqM8ZW6vEzf5Mux1DcAkbEEgMz4yi5IjnoHdVo5tLoLhLoxWGqVBZNMgBDMoCl7/m30HgjjKOOE1CC9HIxaZUuWoZW6n1AbmndrsG/DuO3b64ty7MJDRDTRQu8ogjiRXfoKMZI5HJCtFoTdAncLYggHGftktTRVTNlzNDVR/zaJmuWWx/lFtqiEjsu7jbud8Bu3EXFlLR0vrJJFaIgcvQQ3NJ+kJY2N+9+1rnsMUmX4j5mkQrZMpK0WzFuaC4RrWa36G+4H6gb4zYtTZpNTUoSakmNRaWnU3gUEEyvErdUb9P0G47ffHzTZBA4hkNPU+inmECTeqjMty5QHlBO11PRp/8Au7HAfoeg4kpZqUVqzIINOouxsF9w1+xB2t74zTjrjUWjqpFKQxnmUUDgh6mUfTPIvdYEO6g2LHf2xRckqYaMy0qQz19VHUycqAqeQrKdAkaNSWkeyg27AG1x3xJy/Jqurry9Yoq64kEU5IMcduzVJXpSJe/KB1NsDa+4TeBKGNliXMmZhXv8uNmbTFG2smUr9KNNJ8tDsepmU43zLMsgp0EcESRINgqKAP8AbufvjMchocwNHUB4aataSeWOpjbVFKzI5UFZCSpAUKUGlNI027Y7tntfDl/pZ7RVchcRvLIrNDTL3qJiu11Xpv8AibTte4wCynRariFJlUMrTyi9hbTTwiMt9wZJHF/6BhFT11VG1VJSyQQZY9eacPKgkEPbqRT/AJZ227DbYAE4ZmpTK8ukrlUxyzxCkoEa2pItzzG2sHckzNfa5QYQU2R0lLDLl+ZNK9RyebTci8kcRkXvoSx5gddLatiNNrDfAd8vqabK64PTZmJRPFu8ESlA6ntLBH3jIJIKEMu/6nWeB+PafMNUV1Soj+qO5sw/PGWAJQ99wGF9wMZ3WcQ1EtFSZnTZTo9I2tpg8QUhdUcq8u2sod97dJufw79s7pswaUqKGOKqq5PV0jpUC8EiIolBbSAxZVBKXKm5722DbcGEHA/EQzCjiqbaWYaZF/K67MN97X3H2Iw/wBgwYMAYMGDAGDBgwBgwYMBmnxbXXU5VEagU6mpeTmkAhHjVShs3SdzbfbfCjI8vq3zCvSDOQ0hiicyCGF9dw4CkEEALt9Nh1jFx+KPCf8RomjQAzRnmxX7Fh3Q7j6hdf1t7YzafMMjapoZnp6eJGSSCrgK6TDINJVnjA3AYFdX9Xki2A9ymTM48lp6oTwtDSThmpyhDkRzFQrSb7hrWFhtYkm1i0zms52ZxtmOTTOJqTRDEOXI2pGLO1g4A6WA3IYWG2+EkGV5RIcxo/wCImKJZebT2qtMDB0B0hTdWKMChIBNreRiRBWO+XwZt/F3argGkq/KYRh3VZRyyoZm0WbcktYe+A58HVM2Vc+raMrlctS0EsDtqlpyDpV3W3e2xAJJBHfa73N8u9ByqulcmiF3gqIhrNKH3KOB/NpGO5H1J4NwL1/NKCihrBT1maSy0NXH6qQqwu8w2+ZoW6qQLqLdwB+HCrhfimqydI5dPOyyqkkEcbkaiquVYgXOlttwbqf8AfAaSvEMtVU0XVTwSqsmkSsWim1hQJad1FpLDUOWWRhr3G2O+fcLUnrKBJkEpkM7TSyHrciK+osLFbHcBbBNtIUAYR5fklBmMTvlE8aB+qWgqBqiv9476omv/AJkd7eMQ61qykMYqVYRxPqRKtnlh3BUhauPrCkNbRMuntubYCtcV17tmqQUcZklSWJqSeW+uwFyrMbNLETuGck2BsSDjjR8Y0z1ay02UwJXSSBEkMzmJZGOnXy7Bb3N/t374rfFOZ1NdX1VWq2ZetuU+oIiaY7q621AXFyPcn3wuSOlFXpEsgpg50yAdekdja3e9vGAv/wAKq5hXyU1SjKWaQ1bg7s2tQodlF1QOSCA2li4vcY0TgPhqFTX8lRDLFmMqwyKN1XREQh/NGb7odt9rGxGK8H5tUZbmGqWNWZ0KyxzvpDLKobrY3HlWIIN7WtfGi0lHX1SNFRazFI5kcoZIaclhY3ne9ROLALZAq6QtjYWwFiTiRqN64aqdpXmErFXbkU/y0QtNIVFmYqGEK6nubDvfC2lypXWTMMzdkowRKxmFpKtgegyIN0hU7R0477FrnH1PluW5KiTZhKtROnVDTooCIb3vFD2G/wDmvv5vfFD4izSuzoy1M3yaOlRZuUX09DNYFLj5kjDUAxAXawtexCTmWYz5nUx5tV0skmXRzrBHAv1OGuAEW41nWBqt3PT4NrFwxnSJmsxy3KZ0vSKrQMEhYNzL6yGbSqkFR97XxzyyiL10EORVCTUtMgq9FRITFG8l00qVUyByCzWOylj2O2OSZ1Xp/Es2kqaSCRdVMsZjLk8o6V5W4NjIbamBFwSQAtsBwiGcNleYOopYqbm1BkibUZFux5qoQNNgbgfph7Nw1X+qywNnDMxRyhKJddMe5VTcSXDaSXud8VLOcty6Kkpqc5q0ks84ep5U5eAXN5HZF2uBsCepj9r27zU+TtNOaIM/LjSnoo0nl1yTyXJdAW1Ki3AJNlvq73wGhfBileOGtV5OYBmEoD9tdtIZrW2ucaJhFwTw+tBRQ0o3KL1n3dt2P6XJt9rYe4AwYMGAMGDBgDBgwYAwYMGADjPuOfh4tROlfSCNKuJg5WRdUc+nsHHg+NX/APCNBwYDCOIM/SPMaWaCjSOukX01RR1EYCAFhZ1k2TciwcXuO/tjnLlphqqunqMjVmrUeaBUkR2RlXrCSELpS51WUAr2AYEW2TiLhmlro+XVRLIPB7Mv3VhuP2xQZfhHLTuk2XZjNHJFq5QnAkVdQ6gNgAD56T/1wFO4dzaH/wCFrQUAWvhkaGV3TRG7cplcPIBcsfrsRdbED78K3L6laarrA6wMqSw1cxYMs0ksoYw06qWCqPoLAi+prjY2WZzntXSo2V1SinlSsapkqovrYuCdShbXJvswK7WUgWOGWX1sec1dHlUYeHL4LsFIu8hUFmeQg2DNdhfwXPcnAVWThCsp6VMw5kaXRZVRZbTKjMFWTSBfSSRuD5w94X+KWdBhBGy1LNsomTUR7ksCuwG5ZjYC5O2LPxvkcVfmA9JLNOzxcswxhFVY0sAwkYWWHVc6yGLG2nUDcceJ+DUy7L5pKmdYQ66I6akFuY/4RJLIGklUdyNhYEi18A4+DvCsLmrqn0ypIDShrbSXAM7jwVZzpFvC4T5dkFa9aMgksaCmm9TcpuYyxdRq86ixW3vq/Ljn8O+LajK1aidI6lQzSKscqhgCL6o2J0So1r2U6gb3HgaBD8RVYk/wyvVh0ktEqggH85cLYXJ727++Aqfxbyzk5nS1kelXlTTGzgaBNCysgYkgAOLR3O1r+xIqHEPxdzh9UD6KVh0uI42Vx9jrZip/Sxwx+I+fz5tphHp4Y4dUpQyqxWwYapJV+WCeyxqS2+/2b0fA6V9BFNRziqj025VXbmREW1Ik8YDKR4VgyfSbW7hndbwdWvStmDyJL0LLIvNLTKjkhJHW30m1+5Ntz2NrNFksscVDLI3qmkMIy+ZmvDGQxLQTo/Zdybjf5dhYC2LJ8OMkggqpkqZahJJIhTvTTKoGjSEQM4FmU6bI62BsBe5sanPmkVA9ZkdZzJqLmfLcKBJC2zB1DbEb7ja+5Hcgg7zGuijlzV6h2p8y6IaeGjkdQboNGnQF5gZiCQwuABsDiLl+XRvWUVHR5SFlgi585rwyGSylTqFj0BzcMAbtbYAG6vIZ5K2CSipYGnrjWepWtI0lVuPmM5OpTcdjfubb2xpcHwpaqkWpzeskqZtIXTGBGgUX6bqASLknbTucBV8u4pmjzSr5VDFUV2hYYRSsDBGo3YlrA92AY7bjT04vnBHAzQzPmFfIJ66XuwHTELW0p97barDbYeSbTkuRU1JHy6aFIk8hRufuT3J/UnDLAGDBgwBgwYMAYMGDAGDBgwBjwnHuKJ8Yc7np6JYqUNz6qUU6FTYrqvex/MbaR2te/jATsw4+pUnNNCstVMg1SJTKH0AdySWANr9lJP2xIyvjugmflc7lS/8ACnVon/SzgX/a+MuKT0NZl8ENJQLWRxsqxxuS0jSAKXkYBbaUBPVe/Va+xFzmjzSWJVzDLKKrAuWCSjV5tpWRSoYA2+r9xgNCDY5VVSkaNJIwREBZmY2AA7kk+MZpHkrxr/hqLNqVvEcNXCYxvt0yVDLb7abD2xMoMlp6tpIK55J2KhVSSs5h8hmMUIWOO1hZ+9/awuGJ/EriAZpmLS06My2WKIAHU4W++m17kk2Hfth/8H82i1ehZYoRIWeoqXks7xqNoVuBpBNgd+2vzYi1ZnkNPl9VFSpKkU9aCJKtlWNYYhYGKnWxVHYdNyS29ySSMP8Ajn4dwyZcKXL6ODmgqFkaysoBuza7amJsFNzve/jARsyycpU1NVl2c0tM06oDGywuPlrpVdTXKr+g/vYYynif+IV8piqqlZqqC4jiBj0yId7wmOyM9+6/URptexAvnCPBeWOwo8xy809aFuPny6JwO7RkSWJ8lfF/1tFn4DtW19DS0C8qVIhFPKNS09wSzq7XcsbkBVO5AvsMBlFRSQl5ArmARxg6JwS7uB1IOXHYEte2qwA7nHKXJ5hTrUkJymaw+bGWvcj+WH1j6TuVt29xjTIeEppg0LyR1k6VL0vKnRg4WPq5vPRuYECsDZrqCwUXJAKl+EPkxVfok5c0ghRPWG5kZymm2jVcEG4v+FvbAVGHLYjKYUZqpnj+V6YMPmG1gyyRhiAL30j2scXvgSjraWZqWDM4aR2XmVAblukdtlXruplNzcLsABc3FhPh4dmVoqGCeGjlmnaCeOCNuaqqGcu0rvzXRlAIsVUhgPthzR8FQ1GZRUlXl+iKnoirNGpSKVxINMiuhBJZSSVbcG43tfAN8syYGsWqzDOaerCxPCEAijBV/DaWsR57dwDfbGWfFDNefUmkCpPJDIEhqUN3kjYXWNrXEjAsBq73B8k4uXGfA1AWajynLzNVbcyTnScunB/MWk0lyOy77bkHYG48M8AQLlqU9bS06Sqp1yRgagQTpkElgwcC29/B8YDGfhVxeuVVbmdG5Uo5cht1RkHZrd9je47/ANrH9PUNZHNGskTq6OLqym4I+xxj3D3D9Nm09QJjE9TSMIZp0QNHVxtqAcrcFJrIRrQgg2ILDbD3M+FuSxGXCtSLX1pRVaBVY/V8uY2BG2wIvcYDSywGK/mXGlFC2jnc2X/hQKZX/wCWMG372GKM/DJNjNQ5tW+4qqyEL/yrUWI+3b7YaZJU5rGrJT5LS0sagWQ1CjUTe5BjWx8dwO/c+AYL8TqFJRDViajkNrJUx2uG7NdCyhb33Yi1je2LlBOrqGRgysLgqbgj3BGxGMBzLiqobMal6uip3si0RYktDAdROp30k7FyWKgGynbzi5fBqlq6R63L6kC0DpJHpuU+aCSIyQOjpBt4JbzfAahgwYMAYMGDAGDBgwBhbn2WJURqGW7RyLNEfyyRnUpv+ux9wSPOGWDAfnXLIayOkjYVGuqrakzCnjpwZtcEmp3aQsuh16ukqR+HsWtoMNGtVSpU1WdTqrpuY5EgRN/mLpABuLFOokqdWO3xE4Rmkmpq2jVtUEpaaKJ+W8quV1lGuOuy+Tv+osWeS8DZYVjmFKWO7D1PMLAk3N0lOzX+18BVG/hJCxU9NVZq1wR1ySx6l2uzu3KXvvtbftbbFgpcozWYi8sOWwA3ENKiyOdrdTsugH/Sp2ti8RRhQFUAACwAFgAPAGK1mvGaLK1PSwS1c6fWsVgke1/mStZF/S5P2wCLPeHZqWjleSdswijBllhrVV9SKCW0NsVcDqB37WxL4JnioKKQzTcukWd/TNOSrCLaw6rE9erT7jSR3xCfPcwqbrHLDGLX00aGof8AeeTRTJ7b+x+9k1bmNJTShpKoNUg6F0n1dWT/AE3HJgbbdQh3tvtYh9cVzyZtJEHWWnpkbmUoVbVdTItwHjUm8cQvfW1gOkki+0Oo47zPK2WmmMOYukPNnEQbXABa/MdQVsL9yt9wT3F5Uc1QWKKHpHlUBjbn5jOvYEgdNOp33bSFNztiPWJSZfCKWVWvIwYUEBElRUsLb1UouLE7lEAX6rFxcYDUsiSlkU1tOiXqlV2kUC72Fl1Eew2t43wsp+EEWrE5e8KSPPHBp2SWQAO977/iIFti7m/a2W8PcT1OTy/NjV6eeRjLTQAlaORiSsavcpqK7mPVcew86JP8UsuVCVM7yAX5K08gk/syhR+t7ffAWDOVpYL184RTBGw5pG6obEqPe5AAHubDucZdNxZnGZKFpxHQxTIxgY35k5UkGNGNlDkdh0/Y23CCqz2tz2rRGjSKmjctDDKG5c0iWblO42aRlvt4F7DybTlEkcyTQ0tMDHqvU5bI/Llp5Bb5tM17Wv1WFtwCCpNsB98E5jJlnMpyks9Nq5j9P+Kpmb6udCt2dCRcSpqBG4JHbv8AFHOIJo6OZpTJlhLvNyrlZnQKYYmZd1BbV32BG+4FuEDSseWE9esX4ZDyMxpwCbHUSpcd7EEagbbg4gR19I0knKqmhqCLSRVAFNMxO9pC6mmmO1rPFc3N33GAsnD/AAzmccbPFJRUHM6uRBShwNukPJrGpgO5AI72xBzXIKjWZ63K6aqYAkz0TMkxtazaCQxcDfpLG428YkniWvowokWExAbCZORYD8POiaSmuBtuUF79gMWPLON6Z3SCcPTTyfRHMNn9uXKt4nBvtpYk+2AqGWy5ZK5gWuzGhlUnVFJUyRkn3Imv4/Tv5xJ4mp8zy6laemzQzoNKrHUQrI7EkgBHQXZmJAAK7nyMaFmWWQ1CcueJJUP4XUMP9xijZl8IqNjenmqKUag+iN7x6h2Oh77j9cBSabLq+emzOklmhppg71UtKYRpZWGrUkvMICk/YlSF3HjTvhfA38NppZR82SJS7bksANMdyf8A6YXb3ufJxS+F+FJJs2nd55KqlihamkkkAHNZtmiBUjUq/i9iLHGvxoAAAAANgB4wH1gwYMAYMGDAGDBgwBgwYMAYMGDAcK7Xy35f16Do7fVbbvt398Z1w/LTfwaORfmGmiPPgkOlTUG2o1GoA9L6iSx06SWsSqkaZhRWcMUcsnNkp42e4JYr9Wk3GodmsdxqvbAZrW5W9Y88VTPM8NNpSpkSRlDynq5FPAlktdlTU4Ym9u9mEqCGmotVPHDocIGalpDaVQwveqrGI0eDs6W8FxbDoSzZXV1DSQyzUdXLz1eFC7QyFQGDqvVpOkWKg4VQ05qGgp5UeGnrKyeocyjTJUKtnjidTuAb6Qp3McI7XtgESZpX1IkEckGWUAYrzKdCzzk+IWsHlfxqjAG2xbDik4dpsvp3nldqOAj5kjterqPNi4J5Ybty4xqt5Uk2c5pM9K6skAqa+TVyluFipYVJF9XaOMKRdrBpDftYKtSynI5qtkzLMW9Y0rlaCmPRGb3PMZT9MelddrE6QCQxIXALc3zp5/ROvLo8vFbEKWm06XnCyDVMwGwQbm/a58mxxo1Mts/mN9vQI37cwj/pik8R5fPWRVJhKulMDLUVTL/PlhBYQQD8EEfbY977kli1oqsxRZqjMRbT/B0cHexuzsNu9jbAULh9uVTSSSn1VA07PURxn5tG+smKojKm+kppbUD7+xxapcoiqYkqJHarRRaLMaMlaqJfHORd3Ki26gt7oNziBw/llRlopaeYpG7oBSVVjoLyWZ6OoA+pWYnSe+113BAiZ3w3JTOczy0y0ao+iup4iCYCouXCC6SRgMJNBG6kEab9IfWbVlfFyzVSUdfRNtHWMCpS9gFMsI1QsTtr3Fzu3gTHp1rClPVU5MpTVHTVbhmdVAuaWtX6zbfRIWv5IW5D7IQZpnRo40q0CNOqn/D10EhtztNiC1rkG2oMqqW0kjCOvonp/VUMIeQUlRT1NI63dqRZCS4YLdyihWGgBiQ632JIAocvFPPBEs0sMVSNFNVRgxssqXHIqoLch33IuUDEqfO4dTRU7ZU89Qqqk0JDQwgWacHSklP5DOwutu/yztYkyqsTZpU04SGWGipajntJKuhp3jPQI0PUEvclmAv9sWqLh2kWXnrTxiTUW1BRcMRYsPAYjYsNzgOuQrKKaETm8wiQSHb69I1dtu+J+AYMB4FA7Y9wYMAYMGDAGDBgwBgwYMAYMGDAGDBgwBgwYMAYU8R5FHWRBHZkZHEkciGzxuvZlPvuRY9wThtgwGfZxwjXzLUvJUwGR6J6UcuIpzr3KmTU7BbbjpH423tYYZ5TmtHUQq+pYJIYWgaKUhXg1BdSsG3FuWtj2IF98W7C3MMjpahleenilZPpZ41Yi2+xIwCv4ezrJl1PZNIROUQN1bQSpZSfqRrag3kG+KHl9DqnXLC41R1HIlj2v6aF3qUc730MJY4babbML742BRthSmUwiteqEY57QLGX3uV1E2te3gb2vsPbAKPitMoyydGUMJbQgtskZcgCRz+FUNmv7ge+O/EWf0VMkkzSLI8yCJIo2DNMdwqogNySXtf2tftizSICCCAQRYg9jhZl3DlHTyGSClhicggskaqd++4GAquX8JV0UdE0VRDHNBSemcPEXA1FSSpDqSV0qAG22Pviy8NcPJRq9naWWVzJNNJbVIx97WAAGwUCwGHWDAGDBgwBgwYMAYMGDAGDBgwBgwYMB//Z";
    doc.addImage(logo, "JPEG", 95, 15, 20, 20);
    doc.setFontSize(12);
    doc.setDrawColor(0, 0, 0); // สีดำ
    doc.rect(180, 15, 24, 12, "S"); // กรอกสีเหลี่ยมล้อมรอบตัวอักษร
    doc.text("แบบ สวช. 07", 200, 20, { align: "right" });
    doc.text("(ปรับปรุง2562)", 200, 24, { align: "right" });
    doc.setFontSize(16);
    doc.rect(15, 15, 38, 21, "S"); // กรอบสี่เหลี่ยม (x, y, width, height)
    doc.text("เลขที่รับ ..................", 17, 22);
    doc.rect(15, 15, 38, 11, "S"); // กรอบสี่เหลี่ยม (x, y, width, height)
    doc.text("สำหรับเจ้าหน้าที่", 22, 34);

    doc.setFontSize(14);
    doc.text("แบบคำร้องทั่วไป", 105, 45, {
      align: "center",
    });
    doc.text("วิสาหกิจชุมชนและเครือข่ายวิสาหกิจชุมชน", 105, 51, {
      align: "center",
    });
    doc.text("ตามพระราชบัญญัติส่งเสริมวิสาหกิจชุมชน พ.ศ.2548", 105, 57, {
      align: "center",
    });

    doc.text(`ส่วนที่ 1 สำหรับผู้ยื่นแบบคำร้องทั่วไป`, 20, 63);
    doc.text(`เขียนที่ ${formData.a1}`, 140, 69);
    doc.text(
      "............................................................",
      150,
      70,
    );
    doc.text(`วันที่ ${formData.a2}`, 140, 75);
    doc.text(
      "............................................................",
      147,
      76,
    );
    doc.text(`เรียน ${formData.a0}`, 20, 81);
    doc.text(
      "....................................................................................................",
      27,
      82,
    );
    doc.text(`ข้าพเจ้า ${formData.a3}${formData.a4}`, 20, 87);
    doc.text(
      "............................................................",
      31,
      88,
    );
    doc.text(`นามสกุล ${formData.a5}`, 80, 87);
    doc.text(".....................................................", 92, 88);
    doc.text(`วัน-เดือน-ปีเกิด ${formData.a6}`, 135, 87);
    doc.text(".....................................................", 155, 88);
    doc.text(`หมายเลขประจําตัวประชาชน ${formData.a7}`, 20, 93);
    doc.text(
      "......................................................................................",
      58,
      94,
    );
    doc.text(`เลขรหัสประจำบ้าน ${formData.a8}`, 20, 99);
    doc.text(".....................................................", 45, 100);
    doc.text(`ที่อยู่ปัจจุบัน เลขที่ ${formData.a9}`, 20, 105);
    doc.text("...............................", 44, 106);
    doc.text(`หมู่ที่ ${formData.a10}`, 70, 105);
    doc.text("..........................", 78, 106);
    doc.text(`ถนน ${formData.a11}`, 100, 105);
    doc.text("...........................", 107, 106);
    doc.text(`ตำบล ${formData.a12}`, 130, 105);
    doc.text("..............................................", 139, 106);
    doc.text(`อําเภอ ${formData.a13}`, 20, 111);
    doc.text(".....................................", 30, 112);
    doc.text(`จังหวัด ${formData.a14}`, 60, 111);
    doc.text(".....................................", 70, 112);
    doc.text(`รหัสไปรษณีย์ ${formData.a15}`, 100, 111);
    doc.text(".....................................", 118, 112);
    doc.text(`โทรศัพท์ ${formData.a16}`, 148, 111);
    doc.text("............................................", 160, 112);
    doc.text(`โทรสาร ${formData.a17}`, 20, 117);
    doc.text("............................................", 30, 118);
    doc.text(`Email Address: ${formData.a18}`, 66, 117);
    doc.text(
      "...............................................................................",
      88,
      118,
    );
    doc.text(`เป็นสมาชิกของ (กา / ใน    ที่ต้องการ)`, 20, 123);
    doc.circle(54, 122, 1.5);

    doc.text(`${formData.a19 ? formData.a19 : "วิสาหกิจชุมชน"}`, 35, 129);
    doc.circle(30, 128, 1.5);
    if (formData.a19) {
      doc.setFontSize(20);
      doc.text("/", 29.8, 128);
    }
    doc.setFontSize(14);
    doc.text(`ชื่อ ${formData.a20}`, 70, 129);
    doc.text(
      "...........................................................................................................................................................",
      75,
      130,
    );
    doc.text(`รหัสทะเบียน ${formData.a21}`, 70, 135);
    doc.text(
      "............................................................................................................................................",
      87,
      136,
    );
    doc.text(
      `${formData.a22 ? formData.a22 : "เครือข่ายวิสาหกิจชุมชน"}`,
      35,
      145,
    );
    doc.circle(30, 144, 1.5);
    if (formData.a22) {
      doc.setFontSize(20);
      doc.text("/", 29.8, 144);
    }
    doc.setFontSize(14);
    doc.text(`ชื่อ ${formData.a23}`, 70, 145);
    doc.text(
      "...........................................................................................................................................................",
      75,
      146,
    );
    doc.text(`รหัสทะเบียน ${formData.a24}`, 70, 151);
    doc.text(
      "............................................................................................................................................",
      87,
      152,
    );
    doc.text(`ที่ตั้ง: เลขที่ ${formData.a25}`, 70, 157);
    doc.text("...........................", 85, 158);
    doc.text(`หมู่ที่ ${formData.a26}`, 108, 157);
    doc.text("................", 115, 158);
    doc.text(`ตำบล ${formData.a27}`, 129, 157);
    doc.text("...................................", 137, 158);
    doc.text(`อําเภอ ${formData.a28}`, 70, 163);
    doc.text("...................................", 80, 164);
    doc.text(`จังหวัด ${formData.a29}`, 110, 163);
    doc.text("..........................................", 120, 164);
    doc.text(`รหัสไปรษณีย์ ${formData.a30}`, 155, 163);
    doc.text(".................................", 173, 164);
    doc.text(`โทรศัพท์ ${formData.a31}`, 70, 169);
    doc.text(".........................", 82, 170);
    doc.text(`โทรสาร ${formData.a32}`, 104, 169);
    doc.text(".........................", 114, 170);
    doc.text(`Email Address: ${formData.a33}`, 136, 169);
    doc.text(".....................................................", 157, 170);

    doc.text(
      `มีความประสงค์จะให้ทางราชการดำเนินการอย่างใดอย่างหนึ่ง ดังต่อไปนี้ `,
      20,
      177,
    );
    doc.text(`${formData.requestDetails[0]} `, 20, 183);
    doc.text(
      `...............................................................................................................................................................................................................................`,
      20,
      184,
    );
    doc.text(`${formData.requestDetails[1]} `, 20, 189);
    doc.text(
      `...............................................................................................................................................................................................................................`,
      20,
      190,
    );
    doc.text(`${formData.requestDetails[2]} `, 20, 195);
    doc.text(
      `...............................................................................................................................................................................................................................`,
      20,
      196,
    );
    doc.text(`${formData.requestDetails[3]} `, 20, 201);
    doc.text(
      `...............................................................................................................................................................................................................................`,
      20,
      202,
    );
    doc.text(`${formData.requestDetails[4]} `, 20, 207);
    doc.text(
      `...............................................................................................................................................................................................................................`,
      20,
      208,
    );

    doc.text(`โดยยื่นแบบคำร้อง ณ ${formData.a34}`, 20, 214);
    doc.text(
      "..........................................................................................................",
      48,
      215,
    );
    doc.text(`อําเภอ ${formData.a35}`, 65, 220);
    doc.text(`..........................................`, 75, 221);
    doc.text(`จังหวัด ${formData.a36}`, 110, 220);
    doc.text(`.....................................................`, 120, 221);

    doc.text(
      `ทั้งนี้ ข้าพเจ้ายินยอมให้ตรวจสอบข้อมูลและนำข้อมูลไปใช้เพื่อประโยชน์ต่อวิสาหกิจชุมชน/เครือข่ายวิสาหกิจชุมชนและประโยชน์ต่อทาง
ราชการ เท่านั้น`,
      20,
      227,
    );

    doc.text(
      `ลงชื่อ .................................................... ผู้รับแบบคำร้องทั่วไป`,
      120,
      250,
    );
    doc.text(`${a3a4a5}`, 132, 260);
    doc.text(
      ` (..........................................................)`,
      125,
      261,
    );
    doc.addPage(); // เพิ่มหน้าใหม่

    doc.text(`ส่วนที่ 2 สำหรับเจ้าหน้าที่รับแบบคำร้องทั่วไป`, 20, 24);
    doc.text(
      `ได้รับแบบคำร้องส่วนที่ 1 เรียบร้อยแล้ว เมื่อวันที่ .......... เดือน ............................. พ.ศ. ...............`,
      40,
      40,
    );
    doc.text(
      `ลงชื่อ .................................................... ผู้รับแบบคำร้องทั่วไป`,
      120,
      60,
    );
    doc.text(
      `(......................................................)`,
      128,
      70,
    );
    doc.text(
      `ตำแหน่ง ................................................`,
      120,
      80,
    );

    let fileName = "แบบคำร้องทั่วไป";

    if (formData.a19) {
      fileName += `${formData.a19}`;
    }

    if (formData.a22) {
      fileName += `${formData.a22}`;
    }

    fileName += ".pdf";
    doc.save(fileName);
    addToast("ดาวน์โหลดไฟล์สำเร็จ", "success");
  }

  function clearFormData(type: string) {
    if (type === "objective") {
      formData.a19 = "";
      formData.a20 = "";
      formData.a21 = "";
    } else if (type === "grant") {
      formData.a22 = "";
      formData.a23 = "";
      formData.a24 = "";
      formData.a25 = "";
      formData.a26 = "";
      formData.a27 = "";
      formData.a28 = "";
      formData.a29 = "";
      formData.a30 = "";
      formData.a31 = "";
      formData.a32 = "";
      formData.a33 = "";
    }
  }
</script>

<div class="form-container">
  <Toast />
  <div class="header">
    <div class="title">
      <h1 class="text-2xl">แบบคำร้องทั่วไป</h1>
      <h1 class="text-2xl">วิสาหกิจชุมชนและเครือข่ายวิสาหกิจชุมชน</h1>
      <h1 class="text-2xl">ตามพระราชบัญญัติส่งเสริมวิสาหกิจชุมชน พ.ศ.2548</h1>
    </div>

    <div class="form-number">แบบ สวช. 07 (ปรับปรุง 2562)</div>
  </div>

  <form>
    <div class="form-row two-col">
      <div class="field">
        <label>เขียนที่</label>
        <div class="dotted-line">
          <input type="text" bind:value={formData.a1} />
        </div>
      </div>
      <div class="field">
        <label>วันที่</label>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="1 มกราคม 2555"
            bind:value={formData.a2}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="field">
        <label>เรียน</label>
        <div class="dotted-line">
          <input type="text" bind:value={formData.a0} />
        </div>
      </div>
    </div>

    <div class="form-row two-col">
      <div class="field full-width">
        <label>ข้าพเจ้า</label>
        <div class="dotted-line researcher-input">
          <div class="researcher-field-group">
            <input
              type="text"
              placeholder="คำนำหน้า"
              bind:value={formData.a3}
            />
            <input type="text" placeholder="ชื่อ" bind:value={formData.a4} />
            <input type="text" placeholder="นามสกุล" bind:value={formData.a5} />
          </div>
        </div>
      </div>
      <div class="field full-width">
        <label>วัน-เดือน-ปีเกิด</label>
        <div class="dotted-line">
          <input
            type="text"
            placeholder="1-มกราคม-2555"
            bind:value={formData.a6}
          />
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="field full-width">
        <label>หมายเลขประจําตัวประชาชน</label>
        <div class="dotted-line">
          <input type="text" bind:value={formData.a7} />
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="field full-width">
        <label>เลขรหัสประจำบ้าน</label>
        <div class="dotted-line">
          <input type="text" bind:value={formData.a8} />
        </div>
      </div>

      <div class="form-row three-col">
        <div class="field full-width">
          <label>บ้านเลขที่</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a9} />
          </div>
        </div>
        <div class="field full-width">
          <label>หมู่ที่</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a10} />
          </div>
        </div>
        <div class="field full-width">
          <label>ถนน</label>
          <div class="dotted-line">
            <input
              type="text"
              placeholder="ถ้าไม่มีใส่ -"
              bind:value={formData.a11}
            />
          </div>
        </div>
      </div>

      <div class="form-row three-col">
        <div class="field full-width">
          <label>ตำบล</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a12} />
          </div>
        </div>
        <div class="field full-width">
          <label>อำเภอ</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a13} />
          </div>
        </div>
        <div class="field full-width">
          <label>จังหวัด</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a14} />
          </div>
        </div>
      </div>

      <div class="form-row two-col">
        <div class="field">
          <label>รหัสไปรษณีย์</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a15} />
          </div>
        </div>
        <div class="field">
          <label>โทรศัพท์</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a16} />
          </div>
        </div>
      </div>

      <div class="form-row two-col">
        <div class="field full-width">
          <label>โทรสาร</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a17} />
          </div>
        </div>
        <div class="field">
          <label>Email Address</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a18} />
          </div>
        </div>
      </div>

      <div class="research-type">
        <p>เป็นสมาชิกของ</p>
        <div class="checkbox-group">
          <label>
            <input
              type="radio"
              name="objective"
              value="วิสาหกิจชุมชน"
              bind:group={formData.a19}
              on:change={() => clearFormData("grant")}
            />
            วิสาหกิจชุมชน
          </label>
          {#if formData.a19 === "วิสาหกิจชุมชน"}
            <div class="dotted-line">
              <input type="text" placeholder="ชื่อ" bind:value={formData.a20} />
            </div>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="รหัสทะเบียน"
                bind:value={formData.a21}
              />
            </div>
          {/if}
        </div>

        <div class="checkbox-group">
          <label>
            <input
              type="radio"
              name="grant"
              value="เครือข่ายวิสาหกิจชุมชน"
              bind:group={formData.a22}
              on:change={() => clearFormData("objective")}
            />
            เครือข่ายวิสาหกิจชุมชน
          </label>
          {#if formData.a22 === "เครือข่ายวิสาหกิจชุมชน"}
            <div class="dotted-line">
              <input type="text" placeholder="ชื่อ" bind:value={formData.a23} />
            </div>
            <div class="dotted-line">
              <input
                type="text"
                placeholder="รหัสทะเบียน"
                bind:value={formData.a24}
              />
            </div>
            <div class="form-row three-col">
              <div class="field full-width">
                <span>ที่ตั้ง:</span>
                <label>เลขที่</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a25} />
                </div>
              </div>
              <div class="field full-width">
                <label>หมู่ที่</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a26} />
                </div>
              </div>
              <div class="field full-width">
                <label>ตำบล</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a27} />
                </div>
              </div>
            </div>
            <div class="form-row two-col">
              <div class="field full-width">
                <label>อำเภอ</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a28} />
                </div>
              </div>
              <div class="field full-width">
                <label>จังหวัด</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a29} />
                </div>
              </div>
            </div>
            <div class="form-row two-col">
              <div class="field full-width">
                <label>รหัสไปรษณีย์</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a30} />
                </div>
              </div>
              <div class="field full-width">
                <label>โทรศัพท์</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a31} />
                </div>
              </div>
              <div class="field full-width">
                <label>โทรสาร</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a32} />
                </div>
              </div>
              <div class="field full-width">
                <label>Email Address</label>
                <div class="dotted-line">
                  <input type="text" bind:value={formData.a33} />
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <div class="request-action">
        <p>
          มีความประสงค์จะให้ทางราชการดำเนินการอย่างใดอย่างหนึ่ง ดังต่อไปนี้
          (ใส่หมายเลขความประสงค์)
        </p>
        <ol>
          <li>
            <div class="dotted-line">
              <input
                type="text"
                bind:value={formData.requestDetails[0]}
                placeholder="1.ตัวอย่าง"
              />
            </div>
          </li>
          <li>
            <div class="dotted-line">
              <input
                type="text"
                bind:value={formData.requestDetails[1]}
                placeholder="2.ตัวอย่าง"
              />
            </div>
          </li>
          <li>
            <div class="dotted-line">
              <input type="text" bind:value={formData.requestDetails[2]} />
            </div>
          </li>
          <li>
            <div class="dotted-line">
              <input type="text" bind:value={formData.requestDetails[3]} />
            </div>
          </li>
          <li>
            <div class="dotted-line">
              <input type="text" bind:value={formData.requestDetails[4]} />
            </div>
          </li>
        </ol>
      </div>
      <div class="form-row">
        <div class="field full-width">
          <label>โดยยื่นเเบบคำร้อง ณ</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a34} />
          </div>
        </div>
      </div>

      <div class="form-row two-col">
        <div class="field full-width">
          <label>อำเภอ</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a35} />
          </div>
        </div>
        <div class="field full-width">
          <label>จังหวัด</label>
          <div class="dotted-line">
            <input type="text" bind:value={formData.a36} />
          </div>
        </div>
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

  .logo {
    width: 60px;
    height: auto;
    margin-right: 1px;
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
