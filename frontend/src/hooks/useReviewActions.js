import { useState } from 'react';
import { apiClient } from '../services/apiClient';
import { showToast } from '../utils/toast';

/**
 * useReviewActions
 *
 * The create/edit/delete logic shared by every place a single review can be managed
 * (inline under an order item, or as its own card in "My Reviews") — only the
 * surrounding markup differs between those two spots, not the API interaction.
 */
function useReviewActions({ orderId, itemIndex, review, onSubmitted, onDeleted }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const submitReview = async ({ stars, text }) => {
    const data = review
      ? await apiClient.put(`/reviews/${review._id}`, { stars, text })
      : await apiClient.post('/reviews', { orderId, itemIndex, stars, text });
    onSubmitted(data.review);
    showToast(review ? 'Review updated successfully.' : 'Review submitted successfully.');
    setIsFormOpen(false);
  };

  const deleteReview = async () => {
    setDeleteError('');
    setIsDeleting(true);
    try {
      await apiClient.delete(`/reviews/${review._id}`);
      onDeleted();
      showToast('Review deleted successfully.');
      setIsConfirmingDelete(false);
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isFormOpen,
    openForm: () => setIsFormOpen(true),
    closeForm: () => setIsFormOpen(false),
    submitReview,
    isConfirmingDelete,
    openDeleteConfirm: () => setIsConfirmingDelete(true),
    closeDeleteConfirm: () => {
      setDeleteError('');
      setIsConfirmingDelete(false);
    },
    deleteReview,
    isDeleting,
    deleteError,
  };
}

export default useReviewActions;
