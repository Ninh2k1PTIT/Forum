<div>Project được xây dựng dựa trên ý tưởng dự án <a target="_blank" href="https://github.com/gothinkster/realworld.git">RealWorld</a>. Giao diện tham khảo của <a target="_blank" href="https://github.com/hamzahamidi/angular-forum.git">Hamza Hamidi</a>. Chân thành cảm ơn các tác giả đã chia sẻ ý tưởng/mã nguồn giúp tôi tự xây dựng một project cho riêng mình.</div>
<h3>Công nghệ sử dụng:</h3>
<ul>
  <li>Angular cho ứng dụng Front-end</li>
  <li>Spring boot cho ứng dụng Back-end</li>
  <li>MySQL cho database</li>
 </ul>
<h3>Chạy project Front-end (ForumFE):</h3>
<ol>
  <li>Cài đặt <a target="_blank" href="https://nodejs.org/download/release/latest-v14.x/">Nodejs v14.x</a></li>
  <li>Nhập lệnh: <code>npm i</code></li>
  <li>Nhập lệnh: <code>ng serve</code> và truy cập <a href="http://localhost:4200" target="_blank">localhost:4200</a></li>
</ol>

<h3>Chạy project Back-end (ForumBE):</h3>
<ol>
  <li>Cần cài đặt <a target="_blank" href="https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html">Java 8</a>, <a target="_blank" href="https://dev.mysql.com/downloads/installer/">MySQL</a> và <a target="_blank" href="https://maven.apache.org/download.cgi">Apache Maven</a></li>
  <li>Vào MySQL Workbench, tạo connection với username=root, password=1111 và kết nối với nó, sau đó tạo một schema với name=Forum</li>
  <li>Nhập lệnh: <code>mvn springboot:run</code>, truy cập <a href="http://localhost:8080" target="_blank">localhost:8080</a> để kiểm tra</li>
</ol>
<h3>Demo</h3>
<ul>
<li>Xem demo <a href="https://qa-forum-89da7.web.app/" target="_blank">tại đây</a></li>
<li>Để thuận lợi khi deploy, bản demo hiện dùng PostgreSQL thay vì MySQL. Bạn không cần bận tâm đến điều này.</li>
</ul>
