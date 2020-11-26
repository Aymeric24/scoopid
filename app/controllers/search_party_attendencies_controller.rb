class SearchPartyAttendenciesController < ApplicationController
  # def index
    # @search_party_attendencies = policy_scope(SearchPartyAttendancy).order(created_at: :desc)
  # end

  def create
    @search_party_attendancy = SearchPartyAttendancy.new
    @search_party = SearchParty.find(params[:search_party_id])
    authorize @search_party_attendancy
    @search_party_attendancy.search_party = @search_party
    @search_party_attendancy.user = current_user
    @search_party_attendancy.save
    redirect_to search_parties_path(@search_party)
    authorize @search_party_attendancy
  end

  # def show

  # end

  # def update
  #  @search_party_attendancy = SearchPartyAttendancy.find(params[:id])
  #  @search_party_attendancy.update
  #  redirect_to search_party_path(@search_party)
  #  authorize @search_party_attendancy
  # end

end