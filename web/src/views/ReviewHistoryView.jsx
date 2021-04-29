import { imlink, getReviewHistory } from "../api/api";
import { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import { Pagination } from 'antd';
import { Image, Tag, } from 'antd';

export default function ReviewHistoryView() {

    const [annos, setAnnos] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getReviewHistory().then((history) => setAnnos(history.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <Col>
                {annos.length > 0 &&
                    <Col>
                        {annos[index].annotation.map(e =>
                            <Tag className="edit-tag"
                                key={e}
                                closable={false}>{e}</Tag>
                        )}
                        <Col style={{marginBottom: 32, marginTop: 32}}>
                            <Image width={500} src={imlink(annos[index].file_name)} />
                        </Col>
                    </Col>}
                <Col>
                    <Pagination simple current={index + 1} total={annos.length} defaultPageSize={1} onChange={(page, pagesize) => { setIndex(page - 1) }} />
                </Col>
            </Col>
        </div>
    );

}