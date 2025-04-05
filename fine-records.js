document.addEventListener('DOMContentLoaded', () => {
  const fineTableBody = document.getElementById('fineTableBody');
  const fineRecords = JSON.parse(localStorage.getItem('fineRecords')) || [];

  fineTableBody.innerHTML = '';

  if (fineRecords.length === 0) {
    fineTableBody.innerHTML = `<tr><td colspan="4">No fine records available.</td></tr>`;
    return;
  }

  fineRecords.forEach(record => {
    const checkedDate = new Date(record.takenDate);
    const today = new Date();
    const returnDate = new Date(record.takenDate);
    returnDate.setDate(returnDate.getDate() + 7);

    let daysLate = Math.floor((today - returnDate) / (1000 * 60 * 60 * 24));
    daysLate = daysLate > 0 ? daysLate : 0;
    const fineAmount = daysLate * 5;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${record.bookName}</td>
      <td>${checkedDate.toDateString()}</td>
      <td>${daysLate}</td>
      <td>₹${fineAmount}</td>
    `;
    fineTableBody.appendChild(tr);
  });

  document.getElementById('clearFines').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all fine records?")) {
      localStorage.removeItem('fineRecords');
      location.reload();
    }
  });
});

