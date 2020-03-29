# HOME PAGE TLU

> Ứng dụng được xây dựng bằng nodeJS viết server và dùng framework ReactJS để xây dựng giao diện

---

### Install

clone link về và cài đặt trên command line:

```bash
npm install
```

### Using

Tạo 1 file .env và tạo cái key để set biến môi trường cho server chạy đúng cách nha không nó bị **undefined** :D

Các biến cần set

```env
PHONE_NUMBER=...
MONGODB_URI=...
API_KEY_PHONE=...
API_SECRET_PHONE=...
FACEBOOK_ACCESS_TOKEN=...
```

- **_Note_**: Ở đây mình không public những biến này vì chúng có ảnh hưởng đến thông tin cá nhân của mình.

- Các link tham khảo:
  - Link api send phone: https://developer.nexmo.com/
  - Link mongoDB: https://www.mongodb.com/
  - Link create BOT messenger FB: https://developers.facebook.com/apps

> Nếu bán không muốn cài BOT thì bạn comment 2 router có đường dẫn là _"/message"_ và không cần set biến môi trường **_FACEBOOK_ACCESS_TOKEN_**

Sau đó chạy và thưởng thức:

```bash
npm run dev
```

* _Hiện tại tính năng chat BOT Messenger Facebook các biến hơi thốn và khó hiểu nên các bạn có thể xem thì xem chứ mình cũng chịu :)_ 

---

- **Link tham khảo**: https://lts-tlu.herokuapp.com

> _Nếu có trường hợp lỗi hoặc có vấn đề gì bạn để lại lời nhận xét cho mình ở đường link trên để mình cải thiện thêm nha <3_
