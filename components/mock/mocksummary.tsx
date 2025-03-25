
"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function MockSummary() {
    return (
        <div className="mock-summary">
            <h2 className="text-xl font-semibold mb-4">1. Arrays</h2>
            <p>
                JavaScript มี Array เป็นโครงสร้างข้อมูลที่เก็บชุดของค่า (elements) ในลำดับที่ระบุไว้ Array มีหลายเมธอดให้ใช้งานเพื่อการจัดการและแปลงข้อมูล ซึ่งสำคัญมีดังนี้:
            </p>
            <ul className="list-disc pl-6">
                <li>
                    <strong>`map()`</strong>
                    <p>
                        - ทำงาน: ใช้แปลงค่าของแต่ละ element ใน Array โดยใช้ callback function และคืนค่า Array ใหม่ที่มีผลลัพธ์จากการแปลง
                    </p>
                    <div>
                        <pre>
                            <SyntaxHighlighter language="javascript" style={vs2015}>{`const nums = [1, 2, 3];
const squares = nums.map(x => x * x); // [1, 4, 9]`}</SyntaxHighlighter>
                        </pre>
                    </div>
                </li>
                <li>
                    <strong>`filter()`</strong>
                    <p>
                        - ทำงาน: คัดเลือก element ที่ผ่านเงื่อนไข (callback function คืนค่า true) แล้วคืน Array ใหม่ที่มีเฉพาะ element ที่ตรงเงื่อนไข
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const nums = [1, 2, 3, 4];
const even = nums.filter(x => x % 2 === 0); // [2, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`reduce()`</strong>
                    <p>
                        - ทำงาน: ลด Array ลงเหลือค่าเดียวโดยการคำนวณผ่าน accumulator และ current value ตามลำดับ
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const nums = [1, 2, 3];
const sum = nums.reduce((acc, cur) => acc + cur, 0); // 6`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`pop()`</strong>
                    <p>
                        - ทำงาน: นำ element ตัวสุดท้ายออกจาก Array และคืนค่านั้น
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [1, 2, 3];
const last = arr.pop(); // last = 3, arr = [1, 2]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`push() และ unshift()`</strong>
                    <p>
                        push() - ทำงาน: เพิ่ม element ที่ท้าย Array และคืนความยาวของ Array ใหม่
                        unshift() - เพิ่ม element ที่จุดเริ่มต้นของ Array
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [2, 3];
arr.push(4); // arr = [2, 3, 4]`}</SyntaxHighlighter>
                        <SyntaxHighlighter language="javascript" style={vs2015}>arr.unshift(1);    // arr = [1, 2, 3, 4]</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`concat()`</strong>
                    <p>
                        - ทำงาน: รวมสองหรือมากกว่า Array เข้าด้วยกันและคืน Array ใหม่
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2); // [1, 2, 3, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`reverse()`</strong>
                    <p>
                        - ทำงาน: กลับลำดับของ element ใน Array (เปลี่ยนแปลง Array เดิม)
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [1, 2, 3];
arr.reverse(); // arr = [3, 2, 1]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`slice()`</strong>
                    <p>
                        - ทำงาน: คืน Array ส่วนหนึ่งของ Array เดิมโดยไม่เปลี่ยนแปลง Array ต้นฉบับ
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [1, 2, 3, 4];
const subArr = arr.slice(1, 3); // subArr = [2, 3]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`splice()`</strong>
                    <p>
                        - ทำงาน: ลบ แทรก หรือแทนที่ element ใน Array โดยแก้ไข Array ต้นฉบับ
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [1, 2, 3, 4];
const removed = arr.splice(1, 2); // removed = [2, 3], arr = [1, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`some()`</strong> และ <strong>`every()`</strong>
                    <p>
                        - `some()`: ตรวจสอบว่าอย่างน้อยหนึ่ง element ผ่านเงื่อนไขใน callback หรือไม่ (คืนค่า true/false)
                    </p>
                    <p>
                        - `every()`: ตรวจสอบว่า element ทุกตัวผ่านเงื่อนไขใน callback หรือไม่
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [2, 4, 6];
const allEven = arr.every(x => x % 2 === 0); // true
const hasOdd = arr.some(x => x % 2 !== 0);   // false`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`flat()`</strong>
                    <p>
                        - ทำงาน: แบน Array ที่มีการซ้อนกันหลายชั้นให้เป็น Array ชั้นเดียว
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const nested = [1, [2, [3, 4]]];
const flatArr = nested.flat(2); // [1, 2, 3, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`sort()`</strong>
                    <p>
                        - ทำงาน: เรียงลำดับ element ใน Array โดยใช้ฟังก์ชันเปรียบเทียบ (หากไม่ระบุจะเรียงแบบ string)
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [3, 1, 4, 2];
arr.sort((a, b) => a - b); // [1, 2, 3, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`fill()`</strong>
                    <p>
                        - ทำงาน: กำหนดค่าลงใน Array ตั้งแต่ตำแหน่งที่ระบุไปจนจบ (หรือในช่วงที่กำหนด)
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [1, 2, 3, 4];
arr.fill(0, 1, 3); // arr = [1, 0, 0, 4]`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`find()`</strong> และ <strong>`findIndex()`</strong>
                    <p>
                        - `find()`: คืนค่า element ตัวแรกที่ตรงตามเงื่อนไข
                    </p>
                    <p>
                        - `findIndex()`: คืนค่า index ของ element ตัวแรกที่ตรงตามเงื่อนไข
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const arr = [10, 20, 30];
const found = arr.find(x => x > 15); // 20
const index = arr.findIndex(x => x > 15); // 1`}</SyntaxHighlighter>
                    </pre>
                </li>
                <h2 className="text-xl font-semibold mb-4">2. Strings</h2>
                <p>
                    Strings ใน JavaScript เป็น primitive data type ที่มีฟังก์ชันและเมธอดมากมายเพื่อจัดการและปรับเปลี่ยนข้อความ:
                </p>
            </ul>
            <ul className="list-disc pl-6">
                <li>
                    <strong>`split()`</strong>
                    <p>
                        - ทำงาน: แยก string ตามตัวแบ่ง (delimiter) แล้วคืนค่าเป็น Array ของ substring
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "apple,banana,grape";
            const fruits = str.split(","); // ['apple', 'banana', 'grape']`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`slice()`</strong> และ <strong>`substring()`</strong>
                    <p>
                        - ทำงาน: ตัดส่วนหนึ่งของ string ออกมาโดยใช้ตำแหน่งเริ่มต้นและสิ้นสุด
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "Hello World";
            const sub1 = str.slice(0, 5);       // "Hello"
            const sub2 = str.substring(6, 11);  // "World"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`trim()`</strong>
                    <p>
                        - ทำงาน: ลบช่องว่างที่ไม่จำเป็นออกจากทั้งสองด้านของ string
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "   hello   ";
            const trimmed = str.trim(); // "hello"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`charAt()`</strong> และ <strong>`charCodeAt()`</strong>
                    <p>
                        - `charAt(index)`: คืน character ที่ตำแหน่งที่ระบุ
                    </p>
                    <p>
                        - `charCodeAt(index)`: คืนค่า Unicode ของ character ที่ตำแหน่งนั้น
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "Hello";
            const ch = str.charAt(1);         // "e"
            const code = str.charCodeAt(1);     // 101 (รหัส Unicode ของ "e")`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`toUpperCase()`</strong> และ <strong>`toLowerCase()`</strong>
                    <p>
                        - ทำงาน: แปลงตัวอักษรทั้งหมดเป็นตัวพิมพ์ใหญ่หรือตัวพิมพ์เล็ก
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "Hello";
            const upper = str.toUpperCase(); // "HELLO"
            const lower = str.toLowerCase(); // "hello"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`indexOf()`</strong> และ <strong>`lastIndexOf()`</strong>
                    <p>
                        - `indexOf(substring)`: ค้นหาตำแหน่งแรกที่พบ substring
                    </p>
                    <p>
                        - `lastIndexOf(substring)`: ค้นหาตำแหน่งสุดท้ายที่พบ substring
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "hello world";
            const firstO = str.indexOf("o");      // 4
            const lastO = str.lastIndexOf("o");     // 7`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`replace()`</strong> และ <strong>`replaceAll()`</strong>
                    <p>
                        - ทำงาน: แทนที่ substring ใน string ด้วยค่าที่ระบุ สามารถใช้ regex ได้
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "hello world";
            const newStr = str.replace("world", "JavaScript");
            // "hello JavaScript"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`startsWith()`</strong> และ <strong>`endsWith()`</strong>
                    <p>
                        - ตรวจสอบว่า string เริ่มต้นหรือจบด้วย substring ที่ระบุหรือไม่
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "Hello World";
            str.startsWith("Hello"); // true
            str.endsWith("World");   // true`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`includes()`</strong>
                    <p>
                        - ทำงาน: ตรวจสอบว่า string มี substring ที่ระบุอยู่หรือไม่
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "JavaScript is fun";
            str.includes("fun"); // true`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`repeat()`</strong>
                    <p>
                        - ทำงาน: ทำซ้ำ string จำนวนครั้งที่ระบุแล้วคืน string ใหม่
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "Hi";
            str.repeat(3); // "HiHiHi"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>`padStart()`</strong> และ <strong>`padEnd()`</strong>
                    <p>
                        - ทำงาน: เติม string ด้วยตัวอักษรที่ระบุจน string มีความยาวตามที่ต้องการ
                    </p>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const str = "5";
            str.padStart(3, "0"); // "005"
            str.padEnd(3, "0");   // "500"`}</SyntaxHighlighter>
                    </pre>
                </li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">3. Regular Expressions (Regex)</h2>
            <p>
                Regex ใช้สำหรับค้นหาและจับคู่ pattern ใน string มีองค์ประกอบและฟังก์ชันหลักดังนี้:
            </p>
            <ul className="list-disc pl-6">
                <li>
                    <strong>Pattern และ Flags</strong>
                    - <strong>Pattern:</strong> นิพจน์ที่ระบุรูปแบบ เช่น     <SyntaxHighlighter language="javascript" style={vs2015}>/hello/</SyntaxHighlighter> จับคำว่า "hello"
                    - <strong>Flags:</strong>
                    <ul className="list-disc pl-6">
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>g</SyntaxHighlighter>: Global match (ค้นหาทุกการจับคู่)</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>i</SyntaxHighlighter>: Ignore case (ไม่คำนึงถึงตัวพิมพ์ใหญ่/เล็ก)</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>m</SyntaxHighlighter>: Multiline (ให้ ^ และ $ ทำงานในแต่ละบรรทัด)</li>
                    </ul>
                </li>
                <li>
                    <strong>Character Classes และ Quantifiers</strong>
                    <ul className="list-disc pl-6">
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>\d</SyntaxHighlighter>: ตัวเลข (0-9)</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>\w</SyntaxHighlighter>: ตัวอักษร (รวมตัวเลขและ _ )</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>\s</SyntaxHighlighter>: whitespace</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>.</SyntaxHighlighter>: ใด ๆ ยกเว้น newline</li>
                        <li>Quantifiers เช่น     <SyntaxHighlighter language="javascript" style={vs2015}>*</SyntaxHighlighter> (0 ครั้งขึ้นไป),     <SyntaxHighlighter language="javascript" style={vs2015}>+</SyntaxHighlighter> (1 ครั้งขึ้นไป),     <SyntaxHighlighter language="javascript" style={vs2015}>{`{n}`}</SyntaxHighlighter> (n ครั้ง)</li>
                    </ul>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const regex = /\\d+/g; // จับตัวเลขชุดหนึ่งหรือมากกว่า`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>Anchors และ Groups</strong>
                    <ul className="list-disc pl-6">
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>^</SyntaxHighlighter>: ตรงกับจุดเริ่มต้นของ string</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>$</SyntaxHighlighter>: ตรงกับจุดสิ้นสุดของ string</li>
                        <li>    <SyntaxHighlighter language="javascript" style={vs2015}>()</SyntaxHighlighter>: จับกลุ่ม (Group) และสามารถใช้งานสำหรับ backreference ได้</li>
                    </ul>
                    <pre>
                        <SyntaxHighlighter language="javascript" style={vs2015}>{`const regex = /^Hello/; // จับ string ที่ขึ้นต้นด้วย "Hello"`}</SyntaxHighlighter>
                    </pre>
                </li>
                <li>
                    <strong>Regex Methods</strong>
                    <ul className="list-disc pl-6">
                        <li>
                            <SyntaxHighlighter language="javascript" style={vs2015}>test()</SyntaxHighlighter>: คืนค่า true/false ถ้า pattern พบใน string
                            <pre>
                                <SyntaxHighlighter language="javascript" style={vs2015}>{`/hello/i.test("Hello world"); // true`}</SyntaxHighlighter>
                            </pre>
                        </li>
                        <li>
                            <SyntaxHighlighter language="javascript" style={vs2015}>exec()</SyntaxHighlighter>: คืน array ของการจับคู่ครั้งแรก (หรือ null ถ้าไม่พบ)
                            <pre>
                                <SyntaxHighlighter language="javascript" style={vs2015}>{`const result = /\\d+/.exec("abc123"); // ['123']`}</SyntaxHighlighter>
                            </pre>
                        </li>
                        <li>
                            <SyntaxHighlighter language="javascript" style={vs2015}>String.match()</SyntaxHighlighter>: คืน array ของการจับคู่หรือ null
                            <pre>
                                <SyntaxHighlighter language="javascript" style={vs2015}>{`"abc123".match(/\\d+/); // ['123']`}</SyntaxHighlighter>
                            </pre>
                        </li>
                        <li>
                            <SyntaxHighlighter language="javascript" style={vs2015}>String.replace()</SyntaxHighlighter>: ใช้แทนที่ส่วนที่จับคู่ด้วย string หรือฟังก์ชัน
                            <pre>
                                <SyntaxHighlighter language="javascript" style={vs2015}>{`"abc123".replace(/\\d+/, "XYZ"); // "abcXYZ"`}</SyntaxHighlighter>
                            </pre>
                        </li>
                        <li>
                            <SyntaxHighlighter language="javascript" style={vs2015}>String.split()</SyntaxHighlighter>: แยก string ด้วย regex เป็น Array
                            <pre>
                                <SyntaxHighlighter language="javascript" style={vs2015}>{`"a,b,c".split(/,/); // ['a', 'b', 'c']`}</SyntaxHighlighter>
                            </pre>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

