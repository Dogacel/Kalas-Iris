import { getAnnotationHistory, sendAnnotationSuggestion, imlink } from "../api/api";
import { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import { Pagination } from 'antd';
import { Image, Tag, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;


export default function ReviewView() {

    const [annos, setAnnos] = useState([]);
    const [index, setIndex] = useState(0);
    const [tags, setTags] = useState([]);


    const tagize = (obj, rev=false) => Object.entries(obj)
    .sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, prob]) => 
    <CheckableTag
        key={name}
        checked={tags.includes(rev ? prob: name)}
        onChange={checked => {tags.includes(rev ? prob : name) ? 
            setTags([...tags.filter(e => e !== (rev ? prob : name))]) : setTags([...tags, rev ? prob : name])}}
            >
        {rev ? prob : name}
    </CheckableTag>) 

    useEffect(() => {
        getAnnotationHistory().then((history) => setAnnos(history.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>
            <Row>
                <Col span={4} offset={7}>
                    <Pagination simple current={index+1} total={annos.length} defaultPageSize={1} onChange={(page, pagesize) => {setTags([]); setIndex(page-1); setTags([])}}/>
                </Col>
            </Row>
            <Row>
                <Col span={8} offset={2}>
                    {annos.length > index && 
                        <Image width={500} src={imlink(annos[index].file_name)}/>
                    }
                </Col>
                {annos.length > index && 
                <Col span={6}>

                    <Row>
                        {tagize(annos[index].annotation.categories)}
                    </Row>
                    <hr/>
                    <Row>
                        {tagize(annos[index].annotation.attributes)}
                    </Row>
                    <hr/>
                    <Row>
                        {tagize(annos[index].annotation.colors, true)}
                    </Row>
                    <hr/>
                    <Row>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={10} onClick={() => {
                        sendAnnotationSuggestion(annos[index].file_name, tags).then((r) => {setAnnos([...annos.filter(e => e !== annos[index])]); setTags([]);})
                    }}>
                        Save Suggestion
                    </Button>
                    </Row>
                </Col>
                }
            </Row>
        </div>
    );

}