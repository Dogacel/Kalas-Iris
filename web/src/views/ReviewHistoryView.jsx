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
        <div>
            <Row>
                <Col span={4} offset={7}>
                    <Pagination simple current={index+1} total={annos.length} defaultPageSize={1} onChange={(page, pagesize) => {setIndex(page-1)}}/>
                </Col>
            </Row>
            <Row>

            {annos.length > 0 &&
            <Col>
                <Image width={500} src={imlink(annos[index].file_name)}/>
                {annos[index].annotation.map(e => 
                <Tag className="edit-tag"
                    key={e}
                    closable={false}>{e}</Tag>
                )}
            </Col>}
            </Row>
                
        </div>
    );

}