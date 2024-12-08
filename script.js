let output = 'DELAY 500\n';

        function calculate() {
            output = 'DELAY 500\n';
            document.getElementById('result').innerText = "";
            document.getElementById('error').innerText = '';
            document.getElementById('error2').innerText = '';   
            const inputValue = document.getElementById('wpm').value;
            const number = parseFloat(inputValue);
            const essay = document.getElementById('essay').value;
            
            if (isNaN(number)) {
                document.getElementById('error').innerText = ' please put a valid number';
                output = ' ';
                document.getElementById('outputBox').textContent = output;
                return;
            }
            else if (number > 250) {
                document.getElementById('error').innerText = "be realistic please";
                output = ' ';
                document.getElementById('outputBox').textContent = output;
                return;
            }
            else if (essay == '') {
                document.getElementById('error2').innerText = 'please input text';   
                output = ' ';
                document.getElementById('outputBox').textContent = output;
                return;
            }
            
            const cps = (number * 5) / 60;
            result = Math.floor(1000 / cps);  

            for (const char of essay) {
                getline(char);
            }
            
            document.getElementById('outputBox').textContent = output;
            document.getElementById('result').innerText = "Script Generated. Click Download Script.";
        }

        function downloadScript() {
        const outputBox = document.getElementById('outputBox');
        const scriptContent = outputBox.textContent;

        if (scriptContent.trim() === '') {
            alert('No script to download. Please generate a script first.');
            return;
        }

        // Create a Blob with the script content
        const blob = new Blob([scriptContent], { type: 'text/plain' });
        console.log('Blob created:', blob); // Log the blob to ensure it has content

        // Create a temporary anchor element with download attribute
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'script.txt';
        
        // Append the link to the body
        document.body.appendChild(link);
        
        // Programmatically click the link to trigger the download
        link.click();
        
        // Clean up and remove the link
        document.body.removeChild(link);
        
        // Revoke the blob URL to free up memory
        URL.revokeObjectURL(link.href);
}

        function getrandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }   

        function getline(key) {
            const rdelay = getrandom(result - 50, result + 50);
            const mchance = getrandom(0,130);
            if(mchance == 130){
                mistake(key);
            }
            if (key == ' ') {
                output += 'KEY SPACE \n';
                sdelay = parseInt(rdelay) + 150;
                output += 'DELAY' + ' ' + sdelay + '\n';
                return;  
            }
            else if (key == '.') {
                output += "STRING .\n";
                pdelay = getrandom(rdelay + 200, rdelay + 400);
                output += "DELAY" + ' ' + pdelay + '\n';
                return;
            }
            else if (key == '\n') {
                ndelay = rdelay + 500;
                output += 'DELAY' + ' ' + ndelay + '\n';
                output += 'KEY ENTER\n';
                output += 'DELAY' + ' ' + rdelay + '\n';
            }
            else {
                output += "STRING" + ' ' + key + '\n';
                output += "DELAY" + ' ' + rdelay + '\n';
                return;
            }
        }

        function getRandomCloseLetter(inputLetter) {
            if (typeof inputLetter !== 'string' || inputLetter.length !== 1) {
                return null;
            }

            const keyboardNeighbors = {
                'q': ['q', 'w', 'a'],
                'w': ['w', 'q', 'e', 's'],
                'e': ['e', 'w', 'r', 'd'],
                'r': ['r', 'e', 't', 'f'],
                't': ['t', 'r', 'y', 'g'],
                'y': ['y', 't', 'u', 'h'],
                'u': ['u', 'y', 'i', 'j'],
                'i': ['i', 'u', 'o', 'k'],
                'o': ['o', 'i', 'p', 'l'],
                'p': ['p', 'o'],
                'a': ['a', 'q', 's', 'z'],
                's': ['s', 'a', 'd', 'w', 'x'],
                'd': ['d', 's', 'f', 'e', 'c'],
                'f': ['f', 'd', 'g', 'r'],
                'g': ['g', 'f', 'h', 't'],
                'h': ['h', 'g', 'j', 'y'],
                'j': ['j', 'h', 'k', 'u'],
                'k': ['k', 'j', 'l', 'i'],
                'l': ['l', 'k', 'o'],
                'z': ['z', 'a', 's'],
                'x': ['x', 'z', 's', 'd'],
                'c': ['c', 'x', 'd'],
                'v': ['v', 'c', 'f'],
                'b': ['b', 'v', 'g'],
                'n': ['n', 'b', 'h'],
                'm': ['m', 'n', 'j'],
            };

            const lowerCaseLetter = inputLetter.toLowerCase();

            if (keyboardNeighbors[lowerCaseLetter]) {
                const neighbors = keyboardNeighbors[lowerCaseLetter];
                const randomIndex = Math.floor(Math.random() * neighbors.length);
                return neighbors[randomIndex];
            } else {
                return null;
            }
        }

        function mistake(mkey){
            const rdelay = getrandom(result - 50, result + 50);
            let bskey = getRandomCloseLetter(mkey);
            bsdelay = rdelay+150;
            output+= "STRING" + ' '+ bskey + '\n';
            output += 'DELAY' + ' ' + bsdelay + '\n';
            output += "BACKSPACE" + ' ' + '1\n';
            achance(bskey);
        }

        function achance(button){
            let chance = getrandom(1,5);
            if(chance == 2){
                mistake(button)
            }
        }

        function cg() {
            let tabPressed = false;
            window.addEventListener('keydown', function(event) {
                if (event.key === 'Tab') {
                    event.preventDefault();
                    if (!tabPressed) {
                        tabPressed = true;
                        window.location.replace('https://www.canvas.com');
                    }
                }
            });
        }

        cg();