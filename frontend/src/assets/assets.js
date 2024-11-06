import group_profiles from './group_profiles.png'
import profile_pic from './upload_area.png'
import contact_image from './kham-suc-khoe-tong-quat.png'
import about_image from './form-booking.png'
import logo from './TripleTCare.png'
import logofood from './logofood.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import notification_icon from './notification_icon.svg'
import info_icon from './info_icon.svg'
import EyeIcon from "./eye.svg";
import EyeOffIcon from "./eye_off.svg";
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './BS-NGUYEN-TIEN-LUC.jpg'
import doc2 from './BS-VU-HOANG-DIEP.jpg'
import doc3 from './BS-Cao-Thanh-Tung.jpg'
import doc4 from './BS-TRUONG-THI-ANH-LY.jpg'
import doc5 from './BS-Dinh-Thi-Xuan-Mai-1.jpg'
import doc6 from './THS.BS_.-TRAN-VINH-NGUYEN-DUNG.png'
import doc7 from './BS-Ho-Thi-Dien-1.jpg'
import doc8 from './BS-Nguyen-Huu-Kiet-1.jpg'
import doc9 from './BS-Nguyen-Manh-Hung-1-scaled.jpg'
import doc10 from './BS.CKI_.-NGUYEN-THI-HONG-VAN.png'
import doc11 from './BS-Nguyen-Van-Truyen-1-scaled.jpg'
import doc12 from './BS-Tran-Van-Cu-1.jpg'
import doc13 from './BS-Van-Thi-Thanh-Van-1.jpg'
import doc14 from './BS-Vo-Van-Dinh-1-scaled.jpg'
import doc15 from './THS.BS_.-DINH-TRAN-QUYNH-THU1-e1722841729273.png'
import Dermatologist from './Dermatologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    group_profiles,
    logo,
    logofood,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    notification_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    EyeIcon,
    EyeOffIcon
}

export const specialityData = [
    {
        speciality: 'Ngoại tổng quát',
        image: General_physician
    },
    {
        speciality: 'Phẩu thuật',
        image: Dermatologist
    },
    {
        speciality: 'Sản phụ khoa',
        image: Gynecologist
    },
    {
        speciality: 'Chỉnh hình',
        image: Neurologist
    },
    {
        speciality: 'Nhi khoa',
        image: Pediatricians
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Bs. Nguyễn Tiến Lực',
        image: doc1,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '18 Năm',
        about: 'Bác sĩ Nguyễn Tiến Lực có hơn 18 năm kinh nghiệm trong lĩnh vực phẫu thuật. Ông là chuyên gia xử lý các phẫu thuật mở, phẫu thuật nội soi, phẫu thuật xâm lấn tối thiểu, đặc biệt là sỏi mảnh thận qua da, mảnh sỏi thận bằng ống nội soi mềm, mảnh sỏi niệu quản, phẫu thuật thoát vị nội soi, phẫu thuật trong ổ bụng. Ông cũng được công nhận về chuyên môn và kiến ​​thức y khoa sâu sắc.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Bs. Vũ Hoàng Điệp',
        image: doc2,
        speciality: 'Phẩu thuật',
        degree: 'MBBS',
        experience: '16 Năm',
        about: 'Bác sĩ Điệp có hơn 16 năm kinh nghiệm trong lĩnh vực Gây mê – Hồi sức. Cô được công nhận về chuyên môn và sự cống hiến không ngừng để nâng cao trải nghiệm của bệnh nhân thông qua cải tiến chất lượng liên tục. Bác sĩ Điệp cũng được biết đến với cam kết nâng cao tay nghề và luôn cập nhật những tiến bộ và kỹ thuật y tế mới nhất.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Bs. Cao Thanh Tùng',
        image: doc3,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '36 Năm',
        about: 'Bác sĩ Tùng có hơn 36 năm kinh nghiệm trong lĩnh vực quản lý y tế công cộng. Ông cũng có thế mạnh về lập kế hoạch, báo cáo, truyền thông giáo dục y tế cũng như nắm vững các quy định liên quan đến quản lý y tế.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Bs. Trương Thị Anh Lý',
        image: doc4,
        speciality: 'Nhi khoa',
        degree: 'MBBS',
        experience: '5 Năm',
        about: 'Bác sĩ Trương Thị Anh Lý có hơn 5 năm kinh nghiệm trong lĩnh vực kiểm soát nhiễm khuẩn. Hiện bà là Trưởng khoa kiểm soát nhiễm khuẩn bệnh viện Hoàn Mỹ Bình Dương. Bà còn chịu trách nhiệm tổ chức, thiết kế, triển khai và giám sát việc thực hiện hệ thống các quy định, hướng dẫn, quy trình nghiệp vụ về kiểm soát nhiễm khuẩn nhằm đảm bảo an toàn cho người bệnh và nhân viên y tế, hạn chế tối đa nguy cơ lây truyền vi sinh vật gây bệnh cho người bệnh, nhân viên y tế. nhân viên và cộng đồng trong quá trình cung cấp dịch vụ y tế.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Bs. Đinh Thị Xuân Mai',
        image: doc5,
        speciality: 'Ngoại khoa',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Bác sĩ Đinh Thị Xuân Mai tốt nghiệp Đại học Y Dược Huế năm 2000 và đã tích lũy được nhiều kinh nghiệm làm việc tại nhiều cơ sở y tế, bao gồm Bệnh viện Trung ương Huế, Bệnh viện Chợ Rẫy và Bệnh viện Nhân dân 115. Cô cũng từng là bác sĩ nội trú ở Pháp. Sau khi lấy bằng chuyên khoa II chuyên ngành Nội khoa, bà giảng dạy tại Đại học Y Dược Huế. Với hơn 20 năm kinh nghiệm làm việc tại các bệnh viện hàng đầu trên toàn quốc trong các lĩnh vực nội khoa, nội tiết, gây mê và hồi sức tích cực, bác sĩ Mai đã tích lũy được nhiều kinh nghiệm lâm sàng và kỹ năng lâm sàng sâu rộng trong chăm sóc bệnh nhân. Bà đã tham gia và chủ trì nhiều dự án nghiên cứu khoa học có giá trị. Với tinh thần cống hiến không ngừng nghỉ, không sợ hãi trước thử thách và cam kết không ngừng học hỏi để nâng cao năng lực chuyên môn và các kỹ năng nghề cần thiết, được thúc đẩy bởi tình yêu sâu sắc và đam mê nghề nghiệp, Tiến sĩ Mai mong muốn mang lại sự hài lòng, tin cậy và tự tin cho bệnh nhân của cô.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Bs. Trần Vinh Nguyên Dũng',
        image: doc6,
        speciality: 'Chỉnh hình',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Bác sĩ Trần Vinh Nguyên Dũng là bác sĩ chuyên khoa chẩn đoán hình ảnh dày dạn kinh nghiệm tại nhiều bệnh viện và phòng khám. Cô lấy bằng y khoa tại Đại học Y khoa Phạm Ngọc Thạch năm 2002 và nâng cao hơn nữa chuyên môn của mình thông qua các chương trình đào tạo tại Đại học Aix-Marseille II và Internet de lHôpital Nord – Marseille.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Bs. Hồ Thị Điền',
        image: doc7,
        speciality: 'Chỉnh hình',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Bác sĩ Hồ Thị Điền có hơn 7 năm học tập, nghiên cứu và kinh nghiệm làm việc trong lĩnh vực chẩn đoán hình ảnh tại nhiều cơ sở y tế trên toàn quốc. Cô tốt nghiệp Tiến sĩ Y khoa tại Đại học Y Dược Huế và lấy bằng Thạc sĩ Chẩn đoán Hình ảnh tại Đại học Y khoa Phạm Ngọc Thạch, Thành phố Hồ Chí Minh. Không ngừng nâng cao chuyên môn và tích hợp các kỹ thuật mới trong siêu âm và chẩn đoán hình ảnh, bác sĩ Hồ Thị Điền hỗ trợ các bác sĩ lâm sàng trong việc phát hiện kịp thời các tình trạng bệnh lý phức tạp ở bệnh nhân.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Bs. Nguyễn Hữu Kiệt',
        image: doc8,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '3 Năm',
        about: 'Bác sĩ Nguyễn Hữu Kiệt là chuyên gia y tế giàu kinh nghiệm trong lĩnh vực Nội tổng hợp và Tiêu hóa. Bác sĩ Kiệt tốt nghiệp Đại học Y Dược Thành phố Hồ Chí Minh năm 1987 chuyên ngành y đa khoa. Ông có bề dày hành trình nghề nghiệp đa dạng, từng công tác tại nhiều cơ sở y tế và giữ các vị trí chủ chốt như Trưởng khoa Nội bệnh viện Hoàn Mỹ và Giám đốc Bệnh viện Hoàn Mỹ 2 từ năm 1999 đến năm 2014. Bác sĩ Kiệt có chuyên môn sâu rộng trong chẩn đoán và điều trị. điều trị các rối loạn nội khoa và tiêu hóa tổng quát và cam kết cung cấp dịch vụ chăm sóc sức khỏe có chất lượng cho bệnh nhân.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Bs. Nguyễn Thanh Hùng',
        image: doc9,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '15 Năm',
        about: 'Bác sĩ Nguyễn Thanh Hùng tốt nghiệp Bác sĩ Y khoa Trường Đại học Y Dược Cần Thơ năm 2005. Sau đó, ông lấy bằng Chuyên khoa I về Tai Mũi Họng tại trường cũ vào năm 2013. Bác sĩ Hùng được đánh giá cao vì cam kết cải thiện chuyên môn của mình, đã tham dự nhiều khóa học liên quan đến phẫu thuật các bệnh lý tai mũi họng.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Nguyễn Thị Hồng Vân',
        image: doc10,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '2 Năm',
        about: 'Bác sĩ Nguyễn Thị Hồng Vân là chuyên gia nội khoa giàu kinh nghiệm với 25 năm kinh nghiệm điều trị bệnh nhân người lớn. Cô có chuyên môn đặc biệt về chăm sóc tim mạch và tiểu đường. Bác sĩ Vân tốt nghiệp Đại học Y Dược TP.HCM.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Bs. Nguyễn Văn Truyền',
        image: doc11,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Thầy thuốc ưu tú – BS CKII. Nguyễn Văn Truyện hiện đang là ủy viên ban chấp hành hội Niệu – Thận học Việt Nam (VUNA) Hơn 36 năm kinh nghiệm trong công tác khám chữa bệnh Ngoại tiết niệu và Nam khoa, BSCKII Nguyễn Văn Truyện đã thực hiện nhiều đề tài nghiên cứu khoa học được đánh giá cao và có giá trị được áp dụng trong quá trình khám chữa bệnh thành công cho rất nhiều bệnh nhân tại Bệnh viện Hoàn Mỹ ITO Đồng Nai. Bs Truyện luôn áp dụng những kỹ thuật hiện đại, phẫu thuật ít xâm lấn đem lại hiệu quả tối ưu cho người bệnh, giúp người bệnh nhanh hồi phục và sớm trở lại với cuộc sống thường ngày. Bác sĩ được đồng nghiệp và bệnh nhân đánh giá cao về chuyên môn và kiến thức của mình. Bác sĩ Truyện hiện đang là Phó khoa Ngoại sản – Liên chuyên khoaBs. Truyện được đào tạo chuyên sâu về phẫu thuật và điều trị Ngoại – Tiết niệu, làm chủ các kỹ thuật tiên tiến như cắt đốt u xơ tiền liệt tuyến và tán sỏi niệu.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Trần Văn Cư',
        image: doc12,
        speciality: 'Chỉnh hình',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Bác sĩ Trần Văn Cừ là chuyên gia y tế có nhiều kinh nghiệm trong lĩnh vực chẩn đoán hình ảnh y tế. Ông tốt nghiệp Đại học Y khoa Huế năm 1991. Ban đầu, ông khởi nghiệp trong ngành Nhi khoa, lấy bằng chuyên khoa I chuyên ngành Nhi khoa. Tuy nhiên, sau đó anh chuyển hướng tập trung sang chụp ảnh y tế và đạt được bằng chuyên khoa cấp I về Chẩn đoán hình ảnh. Từng là Trưởng khoa Siêu âm Bệnh viện Vạn Hạnh và Phú Thọ TP.HCM, ông có hơn 20 năm kinh nghiệm trong lĩnh vực siêu âm và tích lũy được nhiều kiến ​​thức, kinh nghiệm. Ông cũng có những đóng góp đáng kể trong việc chẩn đoán cho các bác sĩ khác bằng cách hỗ trợ và chia sẻ kiến ​​thức trong lĩnh vực này.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Bs. Văn Thị Thanh Vân',
        image: doc13,
        speciality: 'Ngoại tổng quát',
        degree: 'MBBS',
        experience: '4 Năm',
        about: 'Bác sĩ Văn Thị Thanh Vân có hơn 25 năm kinh nghiệm trong lĩnh vực Nội tổng hợp và Tiêu hóa. Bà tốt nghiệp Đại học Y Dược Huế năm 1998. Kể từ đó, bác sĩ Vân liên tục theo đuổi việc học tập nâng cao để nâng cao chuyên môn và đạt được nhiều chứng chỉ quan trọng, bao gồm đào tạo về gây mê và hồi sức cấp cứu, bằng chuyên khoa cấp I về nội khoa. , và có bằng chuyên khoa cấp II chuyên khoa Tiêu hóa của Đại học Y Dược Huế. Bà từng đảm nhiệm các chức vụ quan trọng như Trưởng khoa Cấp cứu, Trưởng Ban Tổ chức bệnh viện Bệnh viện Đa khoa Thừa Thiên Huế, Giám đốc Trung tâm Chăm sóc sức khỏe cán bộ cấp cao tỉnh Thừa Thiên Huế. Bác sĩ Vân đam mê chăm sóc và quản lý thành công sức khỏe nhân dân trong lĩnh vực nội khoa và tiêu hóa.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Võ Văn Định',
        image: doc14,
        speciality: 'Nhi khoa',
        degree: 'MBBS',
        experience: '38 Năm',
        about: 'Bác sĩ Võ Văn Định, với hơn 38 năm kinh nghiệm làm việc trong ngành y tế, hiện đang giữ chức vụ Trưởng phòng kế hoạch tổng hợp tại Bệnh viện Hoàn Mỹ ITO Đồng Nai. Ông đã hoàn thành thạc sĩ Y học tại Học viện quân Y năm 1997. Trước đó, ông từng đảm nhận các vị trí quan trọng như Trưởng khoa ngoại và Giám đốc Bệnh viện 7B Quân khu 7. Với kiến thức sâu rộng và kinh nghiệm phong phú, bác sĩ Định đóng góp đáng kể vào việc phát triển và quản lý tại Bệnh viện Hoàn Mỹ ITO Đồng Nai.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Bs. Đinh Trần Quỳnh Thư',
        image: doc15,
        speciality: 'Phẩu thuật',
        degree: 'MBBS',
        experience: '15 Năm',
        about: 'Bác sĩ Đinh Trần Quỳnh Thư là bác sĩ Răng hàm mặt có tay nghề cao với 15 năm kinh nghiệm cung cấp dịch vụ chăm sóc răng miệng toàn diện. Bác có bằng Thạc sĩ Răng hàm mặt từ Đại học Y Dược Thành phố Hồ Chí Minh.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]