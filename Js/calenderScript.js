 let currentDate = new Date();
        let selectedDate = null;
        
        function changeMonth(direction) {
            currentDate.setMonth(currentDate.getMonth() + direction);
            renderCalendar();
        }
        
        function selectDate(day, month, year) {
            // Remove previous selection
            const prevSelected = document.querySelector('.calendar-table .selected');
            if (prevSelected) {
                prevSelected.classList.remove('selected');
            }
            
           
            event.target.classList.add('selected');
            selectedDate = new Date(year, month, day);
            
            console.log('Selected date:', selectedDate.toDateString());
        }
        
        function renderCalendar() {
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            document.getElementById('calMonthYear').textContent = `${monthNames[month]} ${year}`;
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            
           
            const startDay = (firstDay.getDay() + 6) % 7;
            
            const calBody = document.getElementById('calBody');
            calBody.innerHTML = '';
            
            let date = 1;
            const today = new Date();
            
            // Create calendar rows
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');
                
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    
                    if (i === 0 && j < startDay) {
                        // Previous month's days
                        const prevMonth = new Date(year, month - 1, 0);
                        const prevDate = prevMonth.getDate() - (startDay - j - 1);
                        cell.textContent = prevDate;
                        cell.classList.add('other-month');
                        cell.onclick = () => selectDate(prevDate, month - 1, year);
                    } else if (date > daysInMonth) {
                        // Next month's days
                        const nextDate = date - daysInMonth;
                        cell.textContent = nextDate;
                        cell.classList.add('other-month');
                        cell.onclick = () => selectDate(nextDate, month + 1, year);
                        date++;
                    } else {
                        // Current month's days
                        cell.textContent = date;
                        cell.onclick = () => selectDate(date, month, year);
                        
                        // Highlight today
                        if (year === today.getFullYear() && 
                            month === today.getMonth() && 
                            date === today.getDate()) {
                            cell.classList.add('today');
                        }
                        
                        date++;
                    }
                    
                    row.appendChild(cell);
                }
                
                calBody.appendChild(row);
                
                
                if (date > daysInMonth && i > 3) break;
            }
        }
        
       
        renderCalendar();
        
     
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                changeMonth(-1);
            } else if (e.key === 'ArrowRight') {
                changeMonth(1);
            }
        });