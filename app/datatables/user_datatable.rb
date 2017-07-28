class UserDatatable < AjaxDatatablesRails::Base
  # include AjaxDatatablesRails::Extensions::Kaminari
  def_delegator :@view, :link_to
  def_delegator :@view, :raw
  def_delegator :@view, :edit_user_path
  def_delegator :@view, :user_path

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= ['users.name', 'users.email']
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    byebug
    @searchable_columns ||= ['users.name', 'users.email']
  end



  private

  def data
    records.map do |record|
      [
        # example:
        record.name,
        record.email,
        "#{link_to(raw('<i class="fa fa-edit"></i> Edit'), edit_user_path(record))} #{link_to raw('<i class="fa fa-trash-o"></i> Delete'), user_path(record), method: :delete, data: {:confirm => 'Are you sure? This action is irreversible!'}}"
      ]
    end
  end

  def get_raw_records
    User.all
  end

  # ==== These methods represent the basic operations to perform on records
  # and feel free to override them

  # def filter_records(records)
  # end

  # def sort_records(records)
  # end

  # def paginate_records(records)
  # end

  # ==== Insert 'presenter'-like methods below if necessary
end
