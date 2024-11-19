import { useState } from "react";

const useTimetableEdit = () => {
    const [isEditMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");

    const toggleEditMode = () => {
        if (!isEditMode) {
            setMessage(
                `삭제를 희망하는 일정을 클릭해주세요.<br /><br />완료 후, 다시 한번 아이콘을 눌러주세요!`
            );
        } else {
            setMessage("삭제 모드를 종료합니다.");
        }

        setEditMode((prev) => !prev);

        setTimeout(() => { // 3초 뒤 메세지 삭제
            setMessage("");
        }, 3000);
    };

    return { isEditMode, toggleEditMode, message };
};

export default useTimetableEdit;
