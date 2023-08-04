import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";

import { useLoginModal } from "./useLoginModal";

interface UseFavoriteProps {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: UseFavoriteProps) => {
  const { refresh } = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    return currentUser?.favoriteIds?.includes(listingId) || false;
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        refresh();
        toast.success("Success");
      } catch (error: any) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, loginModal, hasFavorite, refresh, listingId]
  );

  return { hasFavorite, toggleFavorite };
};

export default useFavorite;
