import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Spinner } from "react-bootstrap";
import Navibar from "./components/Navibar";
import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCkhGPXjNXxnGQQ8LMxlybxDxg7ZqTstpY",
  authDomain: "miselive.firebaseapp.com",
  projectId: "miselive",
  storageBucket: "miselive.appspot.com",
  messagingSenderId: "1001224144622",
  appId: "1:1001224144622:web:8eb601e556909953a555ff",
  measurementId: "G-6LPNYEPE8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App: React.FC = () => {
  const [miseDoc, setMiseDoc] = useState<DocumentData | null | undefined>(
    undefined
  );

  const fetchData = async () => {
    const miseCol = collection(db, "mise");
    const miseSnapshot = await getDocs(
      query(miseCol, orderBy("createdAt"), limit(1))
    );
    const miseDoc = miseSnapshot.docs[0].data();
    setMiseDoc(miseDoc ?? null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let miseGrade, miseColor, miseTextColor;

  if (miseDoc) {
    if (miseDoc.value <= 30) {
      miseGrade = "좋음";
      miseColor = "info";
      miseTextColor = "white";
    } else if (miseDoc.value <= 80) {
      miseGrade = "보통";
      miseColor = "success";
      miseTextColor = "white";
    } else if (miseDoc.value <= 150) {
      miseGrade = "나쁨";
      miseColor = "warning";
      miseTextColor = "black";
    } else {
      miseGrade = "매우나쁨";
      miseColor = "danger";
      miseTextColor = "white";
    }
  }

  return (
    <div>
      <Navibar />

      <Container fluid="sm" className="py-5">
        <Row className="text-center mb-5">
          <h1 className="fw-bold mb-4">미세먼지 실시간 측정기</h1>
          <h5>
            호산고 1학년 8반 5번 박형주, 9번 이승민, 12번 황부연 자율학습활동
            프로젝트
          </h5>
        </Row>
        <Row className="text-center">
          {miseDoc !== undefined ? (
            <Card bg={miseColor} className={`mx-5 text-${miseTextColor}`}>
              <Card.Body className="text-center">
                <h2>현재 교실의 미세먼지 농도는</h2>
                <hr />
                <div className="d-flex align-items-end justify-content-center my-5">
                  <h1 style={{ fontSize: 60 }} className="me-3">
                    {miseGrade}
                  </h1>
                  <h2>({miseDoc?.value} ㎍/㎥)</h2>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <small>
                  ㎍/㎥: 공기 1세제곱미터당 미세먼지 중량(마이크로그램)
                </small>
              </Card.Footer>
            </Card>
          ) : (
            <h4>
              <Spinner animation="border" variant="primary" className="me-3" />
              데이터를 불러오는 중...
            </h4>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default App;
