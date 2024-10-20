"use client"
import { useEffect, useState } from "react";
import speakerApiRequest from "@/api/speaker"; // Ensure correct path to your API request file
import { ProductDetailResType } from "@/app/schemaValidations/product.schema";
type SpeakerDetailProps = {
  speakerId: string; // ID passed as a prop or fetched from route params
};

const SpeakerDetail = ({ speakerId }: SpeakerDetailProps) => {
  const [speakerDetail, setSpeakerDetail] = useState<ProductDetailResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakerDetail = async () => {
      try {
        const response = await speakerApiRequest.getDetail(speakerId);
        console.log(response)
        setSpeakerDetail(response.payload.value); // assuming response is in the correct format
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch speaker details");
        setLoading(false);
      }
    };

    fetchSpeakerDetail();
  }, [speakerId]);

  if (loading) {
    return <div>Loading speaker details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!speakerDetail) {
    return <div>No speaker detail found</div>;
  }

  return (
    <div className="speaker-detail">
      <img src={speakerDetail.img} alt={speakerDetail.name} className="speaker-image" />
      <h2>{speakerDetail.name}</h2>
      <p>{speakerDetail.decription}</p>
      <p>Price: ${speakerDetail.price}</p>
      <p>Stock: {speakerDetail.unitInStock}</p>
      <p>Brand: {speakerDetail.brand.Name}</p>
    </div>
  );
};

export default SpeakerDetail;
